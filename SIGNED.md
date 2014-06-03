##### Signed by https://keybase.io/max
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJTjeOvAAoJEJgKPw0B/gTfW10IALM9p0JpFtmO0yMRG4YGlXHq
zY/0bVpITeMHCuzEoEMiVOg//cYnA//tgv1MRGmpml0PY3GHW0zByxgOB5LB3ZRG
KcsSGLJK8iVsj/49ibj908mS8bk/1OQ630xwg8CiB8Ar+S/Wmmx1SLDTXaVbStwB
tmA3OBDsyj3ewUpPW0Swebx2KxU3bn5i3+lxKmnDyVc4stOiH/0e1SuKsjj6WKm5
8LVcpyqH+xx8K3Ce8G0ZzlIXqf3DzWZNAy0BuWLiBklqGl0gqYt32N9ATG8cupvJ
W/sfU6R869vIwdXX18Sepz9ZvtxLpaOc4GXKC9nyxmimKZu268U02punzXUl5n4=
=wjTs
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
7638           index.iced    6e0f10fd646831cc683ebb111e561f21123f1dfaf7d389cd16a9ff0dc1b6d29f
25928          index.js      8dc2186e2c8325e2d2db9dcd674b7298d0c93232ee6a4bd01e6eafad489a39bf
12237          index.map     b85c15a376ac3fb97754292710c98a821baf5051686e672975122ad968b5d3bf
609            package.json  cb03bb72bac67c4f097678e1b104de4296bcfc8bd8d747cf0916720b2eaa383c
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

<!-- summarize version = 0.0.8 -->

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