##### Signed by https://keybase.io/max
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJUIsRxAAoJEJgKPw0B/gTfNX8IALNVjzVF9eUgCyBkOozBkx6Z
iktxJrktC75pUwnRH0SsMN5PHKrXhiizljG0zluWJXiCpGbD8WDHEM+VXSl6CaG/
8jVKJtbMb8HFHQzsxYVdbAJZLzSI7BQ/Bf7z7QADk/ksP2LAIQ70gPygMiQWkDfD
nR7fFiOy5OdUp3x2kKwdG4rWRR5ltcVfG505GKYMsDUg+8+tXe1+D92C3zDhV0pg
uD07qUees52LXRlam8S5PqKdlAqWty0GCePaTbBK38UOAkpGI9h5KTfwiGBDlTE2
jgZBAc04BlEqmWwcmQU7F4HQ0qFgx1+wPNlidGDSh0v1neO2sEWZ3UqnA4O5PbE=
=OBh9
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
7854           index.iced    34eee419271bfdddba8dd0f9dc5c294a7a0feac19a3430ec5377f96e0cdac170
26552          index.js      2c6b1273f3fe37575870cf7beabc59d914db28d382cdc78bdb5cca0a83be6c65
12743          index.map     6d9c7b521b7b86889bfba1f11811f906e2b18dcd2736e1e6004758acd426d755
609            package.json  4d32ff050414c4f7568a33035b0839132fa920f916c562997942e53834baeea3
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