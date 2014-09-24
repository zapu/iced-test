##### Signed by https://keybase.io/max
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJUIsiOAAoJEJgKPw0B/gTffTYIAKWftgUD6UBqbnxMAOIf41jg
eHz9n060u3XZqE3UfxZYEyenVnXcdMjjg/Y8pYbGIZ8xx+Z4zcVsLWYcHV4gUIEY
jIyxPQ8pU2GNeCmwgKzV5FsHOifELzFZLC5e6B8cX9TPKtaudNy78DS3PZuSy9ZY
IMO8GwnW2rsdYewL5MhuD0KBHkaZ08YtDLDwLJ2N0GgNK12ufzpieLkj62+VC2cr
U2sL/l/6d/OJk4XTYegRHKHo0IByawt7NwmNb+VrneIKYqY6ZfG/tn9LcBi1OtEd
+RuRaItbXS7hBxA5r2/QcnUKUSbqIaOdCGni2U34c4MRA35NrXgmcGr/wnb7Uo8=
=mQOm
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
7848           index.iced    e91270be9e42bb7c8228dbeb036849fab03b55b8cc57c10932741cab6ff6e83e
26523          index.js      f5dcdeb3ac191d9f5ea65c0cf8dc4c722e6f96a8fdab5dc16ebba9569bdba4e1
12713          index.map     2ee659609b5c7b068ccb8af1c3766d905c09f2c4e267ff380f0426706e28d780
609            package.json  4782c72fd0a679c4b1dfeb52df929c030f0a2ff4679aa28af29e180485d665a3
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