##### Signed by https://keybase.io/max
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJT/MhpAAoJEJgKPw0B/gTfJgoH/07wKkw1yghnoFoybDNWghDB
hctN1iItafeEyAcoPlAWbND7TDO8jxVuClvG7LldYgLL45RCGc8pjIhBEjgNj5Wn
Kg1z1+XSBdIetPf/nH2ywArkwC2P14CFuGMgr5wB8pJhK83sCf6+7J/eQpEvviHU
CaDcWz00EC6qUzYQQ24Xad8lCJbypyAwWurmLGL6dpzwK2lZ+uevNdlHlS39/jjU
GEqBxBgGAONNv1WZYHHdriL05SN9CEmuATZdZqpGHy1KL/g2VAxPFCPz8PCgZC92
PsItjBLVNF/sEZbW6/vHPdg+ZFMEl9Xlz8zwsw5h4TtNNdxpo91sbS1sCQgL6ps=
=F0vw
-----END PGP SIGNATURE-----

```

<!-- END SIGNATURES -->

### Begin signed statement 

#### Expect

```
size   exec  file            contents                                                        
             ./                                                                              
13             .gitignore    16d30e4462189fb14dd611bdb708c510630c576a1f35b9383e89a4352da36c97
206            Makefile      fe36113d39382362b2118a18b836d4a35c091cebf4b96449765ce33341cc0bc2
93             README.md     d0f2182a445e9d2d096307c0cf9c729f553e059a15e1208158ea38ae27c3499d
7589           index.iced    062ad36450d49b99fbc96e08f6f02849d1609e4e500bbb465a72fb0aea2a9319
25907          index.js      46afd306cd256022919b3d092d60fe8c5ef81bd91550d34aabb2fe9566d6285c
12237          index.map     b85c15a376ac3fb97754292710c98a821baf5051686e672975122ad968b5d3bf
609            package.json  0986852852de8b60251386ec83bc4e97aeccd346caf08caa3dd37d749ff1d33f
```

#### Ignore

```
/SIGNED.md
```

#### Presets

```
git      # ignore .git and anything as described by .gitignore files
dropbox  # ignore .dropbox-cache and other Dropbox-related files    
kb       # ignore anything as described by .kbignore files          
```

<!-- summarize version = 0.0.9 -->

### End signed statement

<hr>

#### Notes

With keybase you can sign any directory's contents, whether it's a git repo,
source code distribution, or a personal documents folder. It aims to replace the drudgery of:

  1. comparing a zipped file to a detached statement
  2. downloading a public key
  3. confirming it is in fact the author's by reviewing public statements they've made, using it

All in one simple command:

```bash
keybase dir verify
```

There are lots of options, including assertions for automating your checks.

For more info, check out https://keybase.io/docs/command_line/code_signing