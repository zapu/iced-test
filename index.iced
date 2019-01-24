fs = require 'fs'
path = require 'path'
colors = require 'colors'
deep_equal = require 'deep-equal'
urlmod = require 'url'
vm = null # require on demand in run_code_in_vm

CHECK = "\u2714"
BAD_X = "\u2716"
WAYPOINT = "\u2611"

##-----------------------------------------------------------------------

sort_fn = (a,b) ->
  if (m1 = a.match /^(\d+)_/)? and (m2 = b.match /^(\d+)_/)?
    parseInt(m1[1]) - parseInt(m2[1])
  else a.localeCompare(b)

##-----------------------------------------------------------------------

exports.File = class File
  constructor : (@name, @runner) ->
  new_case : () -> return new Case @
  default_init : (cb) -> cb true
  default_destroy : (cb) -> cb true
  test_error_message : (m) -> @runner.test_error_message m
  waypoint : (m) -> @runner.waypoint m

##-----------------------------------------------------------------------

run_test_case_with_catch = (code, case_obj, cb) ->
  try
    code case_obj, cb
  catch e
    cb e

##-----------------------------------------------------------------------

exports.Case = class Case

  ##-----------------------------------------

  constructor : (@file) ->
    @_ok = true

  ##-----------------------------------------

  search : (s, re, msg) ->
    @assert (s? and s.search(re) >= 0), msg

  ##-----------------------------------------

  assert : (f, what) ->
    if not f
      @error "Assertion failed: #{what}"
      @_ok = false

  ##-----------------------------------------

  equal : (a,b,what) ->
    if not deep_equal a, b
      [ja, jb] = [JSON.stringify(a), JSON.stringify(b)]
      @error "In #{what}: #{ja} != #{jb}"
      @_ok = false

  ##-----------------------------------------

  error : (e) ->
    @file.test_error_message e
    @_ok = false

  ##-----------------------------------------

  no_error : (e) ->
    if e?
      @error e.toString()
      @_ok = false

  ##-----------------------------------------

  esc : (cb_good, cb_bad, msg) ->
    (err, args...) =>
      if err?
        @error (if msg? then (msg + ": ") else "") + err.toString()
        @_ok = false
        cb_bad()
      else
        cb_good args...

  ##-----------------------------------------

  make_esc : (cb_bad, msg) => (cb_good) => @esc cb_good, cb_bad, msg

  ##-----------------------------------------

  is_ok : () -> @_ok

  ##-----------------------------------------

  waypoint : (m) -> @file.waypoint m


##-----------------------------------------------------------------------

class Runner

  ##-----------------------------------------

  constructor : ->
    @_files = []
    @_launches = 0
    @_tests = 0
    @_successes = 0
    @_rc = 0
    @_n_files = 0
    @_n_good_files = 0

  ##-----------------------------------------

  run_files : (cb) ->
    for f in @_files
      await @run_file f, defer()
    cb()

  ##-----------------------------------------

  new_file_obj : (filename) -> new File filename, @

  ##-----------------------------------------

  run_code : (filename, code, cb) ->
    fo = @new_file_obj filename

    if code.init?
      await code.init fo.new_case(), defer err
    else
      await fo.default_init defer ok
      err = "failed to run default init" unless ok

    destroy = code.destroy
    delete code["init"]
    delete code["destroy"]

    @_n_files++
    if err
      @err "Failed to initialize file #{filename}: #{err}"
    else
      @_n_good_files++
      for k,v of code
        @_tests++
        C = fo.new_case()
        hit_error = false

        await
          # If we crash before we hit the main event loop, we
          # have to recover and error out here; otherwise, the
          # error is lost and the program cleanly terminates.
          run_test_case_with_catch v, C, defer err

        if err
          @err "In #{filename}/#{k}: #{err}"
          hit_error = true

        if C.is_ok() and not hit_error
          @_successes++
          @report_good_outcome "#{CHECK} #{filename}: #{k}"
        else
          @report_bad_outcome "#{BAD_X} TESTFAIL #{filename}: #{k}"

    if destroy?
      await destroy fo.new_case(), defer()
    else
      await fo.default_destroy defer()

    cb()

  ##-----------------------------------------

  _intra_vm_func = (fo, cb) ->
    if codeObj.init?
      await codeObj.init fo.new_case(), defer err
    else
      await fo.default_init defer ok

    destroy = codeObj.destroy
    delete codeObj["init"]
    delete codeObj["destroy"]

    for k,func of codeObj
      T = fo.new_case()
      await func T, defer err
      # not done.
    cb null


  run_code_in_vm : (filename, cb) ->
    vm = require 'vm' unless vm?
    fo = @new_file_obj filename
    sandbox = {
      require : (module.parent ? module).require
      fo
    }
    vm.createContext sandbox
    vm.runInContext "codeObj = require('#{filename}')", sandbox

    console.log sandbox

    {codeObj} = sandbox


    if codeObj.init
      res = null
      sandbox.tc = fo.new_case()
      sandbox.cb = () -> res = arguments
      vm.runInContext "codeObj['init'](tc, cb)", sandbox
      loop
        break if res?
        await setTimeout defer(), 1
    else
      vm.runInContext "fo.default_init()", sandbox

    console.log "::::: rip"
    cb new Error "wip"

  prepare_code_str : (full_path) ->
    console.log require.extensions
    extname = path.extname full_path
    loadFunc = require.extensions[extname]
    if not loadFunc
      loadFunc = require.extensions['.js']
      console.warn "Treating '#{full_path}' as JavaScript even though the filename extension is unknown."
    code_str = loadFunc module.parent ? module, full_path
    return code_str

  ##-----------------------------------------

  report : () ->
    if @_rc < 0
      @err "#{BAD_X} Failure due to test configuration issues"
    @_rc = -1 unless @_tests is @_successes

    opts = if @_rc is 0 then { green : true } else { red : true }
    opts.bold = true

    @log "Tests: #{@_successes}/#{@_tests} passed", opts

    if @_n_files isnt @_n_good_files
      @err " -> Only #{@_n_good_files}/#{@_n_files} files ran properly", { bold : true }
    return @_rc

  ##-----------------------------------------

  err : (e, opts = {}) ->
    opts.red = true
    @log e, opts
    @_rc = -1

  ##-----------------------------------------

  waypoint : (txt) ->
    @log "  #{WAYPOINT} #{txt}", { green : true }
  report_good_outcome : (txt) ->
    @log txt, { green : true }
  report_bad_outcome : (txt) ->
    @log txt, { red : true, bold : true }
  test_error_message : (txt) ->
    @log "- #{txt}", { red : true }

  ##-----------------------------------------

  init : (cb) -> cb true
  finish : (cb) -> cb true

  ##-----------------------------------------

##-----------------------------------------------------------------------

exports.ServerRunner = class ServerRunner extends Runner

  ##-----------------------------------------

  constructor : () ->
    super()

  ##-----------------------------------------

  run_file : (f, cb) ->
    try
      m = path.resolve @_dir, f
      await @run_code_in_vm m, defer()
    catch e
      @err "In reading #{m}: #{e}\n#{e.stack}"
    cb()

  ##-----------------------------------------

  log : (msg, { green, red, bold })->
    msg = msg.green if green
    msg = msg.bold if bold
    msg = msg.red if red
    console.log msg

  ##-----------------------------------------

  load_files : ({mainfile, whitelist, files_dir}, cb) ->
    wld = null
    if whitelist?
      wld = {}
      wld[k] = true for k in whitelist

    @_dir = path.dirname mainfile
    @_dir = path.join @_dir, files_dir if files_dir?
    base = path.basename mainfile
    await fs.readdir @_dir, defer err, files
    if err?
      ok = false
      @err "In reading #{@_dir}: #{err}"
    else
      ok = true
      re = /.*\.(iced|coffee)$/
      for file in files when file.match(re) and (file isnt base) and (not wld? or wld[file])
        @_files.push file
      @_files.sort sort_fn
    cb ok

  #-------------------------------------

  report_good_outcome : (msg) -> console.log msg.green
  report_bad_outcome  : (msg) -> console.log msg.bold.red

  ##-----------------------------------------

  run : (opts, cb) ->
    await @init defer ok
    await @load_files opts, defer ok  if ok
    await @run_files defer() if ok
    @report()
    await @finish defer ok
    cb @_rc

##-----------------------------------------------------------------------

$ = (m) -> window?.document?.getElementById(m)

##-----------------------------------------------------------------------

exports.BrowserRunner = class BrowserRunner extends Runner

  constructor : (@divs) ->
    super()

  ##-----------------------------------------

  log : (m, {red, green, bold}) ->
    style =
      margin : "0px"
    style.color = "green" if green
    style.color = "red" if red
    style["font-weight"] = "bold" if bold
    style_tag = ("#{k}: #{v}" for k,v of style).join "; "
    tag = "<p style=\"#{style_tag}\">#{m}</p>\n"
    $(@divs.log).innerHTML += tag

  ##-----------------------------------------

  run : (modules, cb) ->
    await @init defer ok
    for k,v of modules when not v.skip
      await @run_code k, v, defer ok
    @report()
    await @finish defer ok
    $(@divs.rc).innerHTML = @_rc
    cb @_rc

##-----------------------------------------------------------------------

exports.run = run = ({mainfile, klass, whitelist, files_dir, runner}) ->
  unless runner?
    klass = ServerRunner unless klass?
    runner = new klass()
  await runner.run { mainfile, whitelist, files_dir }, defer rc
  process.exit rc

##-----------------------------------------------------------------------

exports.main = main = ( {mainfile, files_dir} ) ->
  argv = require('minimist')(process.argv[2...])
  whitelist = if argv._.length > 0 then argv._ else null
  files_dir = "files" unless files_dir?
  run { mainfile, whitelist, files_dir }

##-----------------------------------------------------------------------
