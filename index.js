// Generated by IcedCoffeeScript 1.6.2a
(function() {
  var $, BAD_X, BrowserRunner, CHECK, Case, File, Runner, ServerRunner, colors, deep_equal, fs, iced, path, urlmod, __iced_k, __iced_k_noop,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  iced = require('iced-coffee-script/lib/coffee-script/iced').runtime;
  __iced_k = __iced_k_noop = function() {};

  fs = require('fs');

  path = require('path');

  colors = require('colors');

  deep_equal = require('deep-equal');

  urlmod = require('url');

  CHECK = "\u2714";

  BAD_X = "\u2716";

  exports.File = File = (function() {
    function File(name, runner) {
      this.name = name;
      this.runner = runner;
    }

    File.prototype.new_case = function() {
      return new Case(this);
    };

    File.prototype.default_init = function(cb) {
      return cb(true);
    };

    File.prototype.default_destroy = function(cb) {
      return cb(true);
    };

    File.prototype.test_error_message = function(m) {
      return this.runner.test_error_message(m);
    };

    return File;

  })();

  exports.Case = Case = (function() {
    function Case(file) {
      this.file = file;
      this._ok = true;
    }

    Case.prototype.search = function(s, re, msg) {
      return this.assert((s != null) && s.search(re) >= 0, msg);
    };

    Case.prototype.assert = function(f, what) {
      if (!f) {
        this.error("Assertion failed: " + what);
        return this._ok = false;
      }
    };

    Case.prototype.equal = function(a, b, what) {
      var ja, jb, _ref;
      if (!deep_equal(a, b)) {
        _ref = [JSON.stringify(a), JSON.stringify(b)], ja = _ref[0], jb = _ref[1];
        this.error("In " + what + ": " + ja + " != " + jb);
        return this._ok = false;
      }
    };

    Case.prototype.error = function(e) {
      this.file.test_error_message(e);
      return this._ok = false;
    };

    Case.prototype.is_ok = function() {
      return this._ok;
    };

    return Case;

  })();

  Runner = (function() {
    function Runner() {
      this._files = [];
      this._launches = 0;
      this._tests = 0;
      this._successes = 0;
      this._rc = 0;
      this._n_files = 0;
      this._n_good_files = 0;
    }

    Runner.prototype.run_files = function(cb) {
      var f, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        var _i, _len, _ref, _results, _while;
        _ref = _this._files;
        _len = _ref.length;
        _i = 0;
        _results = [];
        _while = function(__iced_k) {
          var _break, _continue, _next;
          _break = function() {
            return __iced_k(_results);
          };
          _continue = function() {
            return iced.trampoline(function() {
              ++_i;
              return _while(__iced_k);
            });
          };
          _next = function(__iced_next_arg) {
            _results.push(__iced_next_arg);
            return _continue();
          };
          if (!(_i < _len)) {
            return _break();
          } else {
            f = _ref[_i];
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "index.iced",
                funcname: "Runner.run_files"
              });
              _this.run_file(f, __iced_deferrals.defer({
                lineno: 77
              }));
              __iced_deferrals._fulfill();
            })(_next);
          }
        };
        _while(__iced_k);
      })(function() {
        return cb();
      });
    };

    Runner.prototype.new_file_obj = function(fn) {
      return new File(fn, this);
    };

    Runner.prototype.run_code = function(fn, code, cb) {
      var C, destroy, err, fo, k, ok, v, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      fo = this.new_file_obj(fn);
      (function(__iced_k) {
        if (code.init != null) {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "index.iced",
              funcname: "Runner.run_code"
            });
            code.init(fo, __iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return err = arguments[0];
                };
              })(),
              lineno: 90
            }));
            __iced_deferrals._fulfill();
          })(__iced_k);
        } else {
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "index.iced",
              funcname: "Runner.run_code"
            });
            fo.default_init(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return ok = arguments[0];
                };
              })(),
              lineno: 92
            }));
            __iced_deferrals._fulfill();
          })(function() {
            return __iced_k(!ok ? err = "failed to run default init" : void 0);
          });
        }
      })(function() {
        destroy = code.destroy;
        delete code["init"];
        delete code["destroy"];
        _this._n_files++;
        (function(__iced_k) {
          if (err) {
            return __iced_k(_this.err("Failed to initialize file " + fn + ": " + err));
          } else {
            _this._n_good_files++;
            (function(__iced_k) {
              var _i, _k, _keys, _ref, _results, _while;
              _ref = code;
              _keys = (function() {
                var _results1;
                _results1 = [];
                for (_k in _ref) {
                  _results1.push(_k);
                }
                return _results1;
              })();
              _i = 0;
              _results = [];
              _while = function(__iced_k) {
                var _break, _continue, _next;
                _break = function() {
                  return __iced_k(_results);
                };
                _continue = function() {
                  return iced.trampoline(function() {
                    ++_i;
                    return _while(__iced_k);
                  });
                };
                _next = function(__iced_next_arg) {
                  _results.push(__iced_next_arg);
                  return _continue();
                };
                if (!(_i < _keys.length)) {
                  return _break();
                } else {
                  k = _keys[_i];
                  v = _ref[k];
                  _this._tests++;
                  C = fo.new_case();
                  (function(__iced_k) {
                    __iced_deferrals = new iced.Deferrals(__iced_k, {
                      parent: ___iced_passed_deferral,
                      filename: "index.iced",
                      funcname: "Runner.run_code"
                    });
                    v(C, __iced_deferrals.defer({
                      assign_fn: (function() {
                        return function() {
                          return err = arguments[0];
                        };
                      })(),
                      lineno: 107
                    }));
                    __iced_deferrals._fulfill();
                  })(function() {
                    return _next(err ? _this.err("In " + fn + "/" + k + ": " + err) : C.is_ok() ? (_this._successes++, _this.report_good_outcome("" + CHECK + " " + fn + ": " + k)) : _this.report_bad_outcome("" + BAD_X + " " + fn + ": " + k));
                  });
                }
              };
              _while(__iced_k);
            })(__iced_k);
          }
        })(function() {
          (function(__iced_k) {
            if (destroy != null) {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "index.iced",
                  funcname: "Runner.run_code"
                });
                destroy(fo, __iced_deferrals.defer({
                  lineno: 117
                }));
                __iced_deferrals._fulfill();
              })(__iced_k);
            } else {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "index.iced",
                  funcname: "Runner.run_code"
                });
                fo.default_destroy(__iced_deferrals.defer({
                  lineno: 119
                }));
                __iced_deferrals._fulfill();
              })(__iced_k);
            }
          })(function() {
            return cb();
          });
        });
      });
    };

    Runner.prototype.report = function() {
      var opts;
      if (this._rc < 0) {
        this.err("" + BAD_X + " Failure due to test configuration issues");
      }
      if (this._tests !== this._successes) {
        this._rc = -1;
      }
      opts = this._rc === 0 ? {
        green: true
      } : {
        red: true
      };
      opts.bold = true;
      this.log("Tests: " + this._successes + "/" + this._tests + " passed", opts);
      if (this._n_files !== this._n_good_files) {
        this.err(" -> Only " + this._n_good_files + "/" + this._n_files + " files ran properly", {
          bold: true
        });
      }
      return this._rc;
    };

    Runner.prototype.err = function(e, opts) {
      if (opts == null) {
        opts = {};
      }
      opts.red = true;
      this.log(e, opts);
      return this._rc = -1;
    };

    Runner.prototype.report_good_outcome = function(txt) {
      return this.log(txt, {
        green: true
      });
    };

    Runner.prototype.report_bad_outcome = function(txt) {
      return this.log(txt, {
        red: true,
        bold: true
      });
    };

    Runner.prototype.test_error_message = function(txt) {
      return this.log("- " + txt, {
        red: true
      });
    };

    Runner.prototype.init = function(cb) {
      return cb(true);
    };

    Runner.prototype.finish = function(cb) {
      return cb(true);
    };

    return Runner;

  })();

  exports.ServerRunner = ServerRunner = (function(_super) {
    __extends(ServerRunner, _super);

    function ServerRunner() {
      ServerRunner.__super__.constructor.call(this);
    }

    ServerRunner.prototype.run_file = function(f, cb) {
      var dat, e, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        try {
          dat = require(path.join(_this._dir, f));
          if (dat.skip == null) {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "index.iced",
                funcname: "ServerRunner.run_file"
              });
              _this.run_code(f, dat, __iced_deferrals.defer({
                lineno: 176
              }));
              __iced_deferrals._fulfill();
            })(__iced_k);
          } else {
            return __iced_k();
          }
        } catch (_error) {
          e = _error;
          return _this.err("In reading " + f + ": " + e + "\n" + e.stack);
        }
      })(function() {
        return cb();
      });
    };

    ServerRunner.prototype.log = function(msg, _arg) {
      var bold, green, red;
      green = _arg.green, red = _arg.red, bold = _arg.bold;
      if (green) {
        msg = msg.green;
      }
      if (bold) {
        msg = msg.bold;
      }
      if (red) {
        msg = msg.red;
      }
      return console.log(msg);
    };

    ServerRunner.prototype.load_files = function(_arg, cb) {
      var base, err, file, files, files_dir, k, mainfile, ok, re, whitelist, wld, ___iced_passed_deferral, __iced_deferrals, __iced_k, _i, _len,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      mainfile = _arg.mainfile, whitelist = _arg.whitelist, files_dir = _arg.files_dir;
      wld = null;
      if (whitelist != null) {
        wld = {};
        for (_i = 0, _len = whitelist.length; _i < _len; _i++) {
          k = whitelist[_i];
          wld[k] = true;
        }
      }
      this._dir = path.dirname(mainfile);
      if (files_dir != null) {
        this._dir = path.join(this._dir, files_dir);
      }
      base = path.basename(mainfile);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "index.iced",
          funcname: "ServerRunner.load_files"
        });
        fs.readdir(_this._dir, __iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              err = arguments[0];
              return files = arguments[1];
            };
          })(),
          lineno: 201
        }));
        __iced_deferrals._fulfill();
      })(function() {
        var _j, _len1;
        if (typeof err !== "undefined" && err !== null) {
          ok = false;
          _this.err("In reading " + _this._dir + ": " + err);
        } else {
          ok = true;
          re = /.*\.(iced|coffee)$/;
          for (_j = 0, _len1 = files.length; _j < _len1; _j++) {
            file = files[_j];
            if (file.match(re) && (file !== base) && ((wld == null) || wld[file])) {
              _this._files.push(file);
            }
          }
          _this._files.sort();
        }
        return cb(ok);
      });
    };

    ServerRunner.prototype.report_good_outcome = function(msg) {
      return console.log(msg.green);
    };

    ServerRunner.prototype.report_bad_outcome = function(msg) {
      return console.log(msg.bold.red);
    };

    ServerRunner.prototype.run = function(opts, cb) {
      var ok, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "index.iced",
          funcname: "ServerRunner.run"
        });
        _this.init(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return ok = arguments[0];
            };
          })(),
          lineno: 221
        }));
        __iced_deferrals._fulfill();
      })(function() {
        (function(__iced_k) {
          if (ok) {
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "index.iced",
                funcname: "ServerRunner.run"
              });
              _this.load_files(opts, __iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    return ok = arguments[0];
                  };
                })(),
                lineno: 222
              }));
              __iced_deferrals._fulfill();
            })(__iced_k);
          } else {
            return __iced_k();
          }
        })(function() {
          (function(__iced_k) {
            if (ok) {
              (function(__iced_k) {
                __iced_deferrals = new iced.Deferrals(__iced_k, {
                  parent: ___iced_passed_deferral,
                  filename: "index.iced",
                  funcname: "ServerRunner.run"
                });
                _this.run_files(__iced_deferrals.defer({
                  lineno: 223
                }));
                __iced_deferrals._fulfill();
              })(__iced_k);
            } else {
              return __iced_k();
            }
          })(function() {
            _this.report();
            (function(__iced_k) {
              __iced_deferrals = new iced.Deferrals(__iced_k, {
                parent: ___iced_passed_deferral,
                filename: "index.iced",
                funcname: "ServerRunner.run"
              });
              _this.finish(__iced_deferrals.defer({
                assign_fn: (function() {
                  return function() {
                    return ok = arguments[0];
                  };
                })(),
                lineno: 225
              }));
              __iced_deferrals._fulfill();
            })(function() {
              return cb(_this._rc);
            });
          });
        });
      });
    };

    return ServerRunner;

  })(Runner);

  $ = function(m) {
    var _ref;
    return typeof window !== "undefined" && window !== null ? (_ref = window.document) != null ? _ref.getElementById(m) : void 0 : void 0;
  };

  exports.BrowserRunner = BrowserRunner = (function(_super) {
    __extends(BrowserRunner, _super);

    function BrowserRunner(divs) {
      this.divs = divs;
      BrowserRunner.__super__.constructor.call(this);
    }

    BrowserRunner.prototype.log = function(m, _arg) {
      var bold, green, k, red, style, style_tag, tag, v;
      red = _arg.red, green = _arg.green, bold = _arg.bold;
      style = {
        margin: "0px"
      };
      if (green) {
        style.color = "green";
      }
      if (red) {
        style.color = "red";
      }
      if (bold) {
        style["font-weight"] = "bold";
      }
      style_tag = ((function() {
        var _results;
        _results = [];
        for (k in style) {
          v = style[k];
          _results.push("" + k + ": " + v);
        }
        return _results;
      })()).join("; ");
      tag = "<p style=\"" + style_tag + "\">" + m + "</p>\n";
      return $(this.divs.log).innerHTML += tag;
    };

    BrowserRunner.prototype.run = function(modules, cb) {
      var k, ok, v, ___iced_passed_deferral, __iced_deferrals, __iced_k,
        _this = this;
      __iced_k = __iced_k_noop;
      ___iced_passed_deferral = iced.findDeferral(arguments);
      (function(__iced_k) {
        __iced_deferrals = new iced.Deferrals(__iced_k, {
          parent: ___iced_passed_deferral,
          filename: "index.iced",
          funcname: "BrowserRunner.run"
        });
        _this.init(__iced_deferrals.defer({
          assign_fn: (function() {
            return function() {
              return ok = arguments[0];
            };
          })(),
          lineno: 254
        }));
        __iced_deferrals._fulfill();
      })(function() {
        (function(__iced_k) {
          var _i, _k, _keys, _ref, _results, _while;
          _ref = modules;
          _keys = (function() {
            var _results1;
            _results1 = [];
            for (_k in _ref) {
              _results1.push(_k);
            }
            return _results1;
          })();
          _i = 0;
          _results = [];
          _while = function(__iced_k) {
            var _break, _continue, _next;
            _break = function() {
              return __iced_k(_results);
            };
            _continue = function() {
              return iced.trampoline(function() {
                ++_i;
                return _while(__iced_k);
              });
            };
            _next = function(__iced_next_arg) {
              _results.push(__iced_next_arg);
              return _continue();
            };
            if (!(_i < _keys.length)) {
              return _break();
            } else {
              k = _keys[_i];
              v = _ref[k];
              if (!v.skip) {
                (function(__iced_k) {
                  __iced_deferrals = new iced.Deferrals(__iced_k, {
                    parent: ___iced_passed_deferral,
                    filename: "index.iced",
                    funcname: "BrowserRunner.run"
                  });
                  _this.run_code(k, v, __iced_deferrals.defer({
                    assign_fn: (function() {
                      return function() {
                        return ok = arguments[0];
                      };
                    })(),
                    lineno: 256
                  }));
                  __iced_deferrals._fulfill();
                })(_next);
              } else {
                return _continue();
              }
            }
          };
          _while(__iced_k);
        })(function() {
          _this.report();
          (function(__iced_k) {
            __iced_deferrals = new iced.Deferrals(__iced_k, {
              parent: ___iced_passed_deferral,
              filename: "index.iced",
              funcname: "BrowserRunner.run"
            });
            _this.finish(__iced_deferrals.defer({
              assign_fn: (function() {
                return function() {
                  return ok = arguments[0];
                };
              })(),
              lineno: 258
            }));
            __iced_deferrals._fulfill();
          })(function() {
            $(_this.divs.rc).innerHTML = _this._rc;
            return cb(_this._rc);
          });
        });
      });
    };

    return BrowserRunner;

  })(Runner);

  exports.run = function(_arg) {
    var files_dir, klass, mainfile, rc, runner, whitelist, ___iced_passed_deferral, __iced_deferrals, __iced_k,
      _this = this;
    __iced_k = __iced_k_noop;
    ___iced_passed_deferral = iced.findDeferral(arguments);
    mainfile = _arg.mainfile, klass = _arg.klass, whitelist = _arg.whitelist, files_dir = _arg.files_dir;
    if (klass == null) {
      klass = ServerRunner;
    }
    runner = new klass();
    (function(__iced_k) {
      __iced_deferrals = new iced.Deferrals(__iced_k, {
        parent: ___iced_passed_deferral,
        filename: "index.iced",
        funcname: "run"
      });
      runner.run({
        mainfile: mainfile,
        whitelist: whitelist,
        files_dir: files_dir
      }, __iced_deferrals.defer({
        assign_fn: (function() {
          return function() {
            return rc = arguments[0];
          };
        })(),
        lineno: 267
      }));
      __iced_deferrals._fulfill();
    })(function() {
      return process.exit(rc);
    });
  };

}).call(this);

/*
//@ sourceMappingURL=index.map
*/
