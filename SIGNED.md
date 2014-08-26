##### Signed by https://keybase.io/max
```
-----BEGIN PGP SIGNATURE-----
Version: GnuPG/MacGPG2 v2.0.22 (Darwin)
Comment: GPGTools - https://gpgtools.org

iQEcBAABCgAGBQJT/M2yAAoJEJgKPw0B/gTffyEH/33GHBZg6V46RguX2EqFTBlL
pWNTZPi/5Skj7t3kqpCc051/qlfwgB/STBg6D7oI6h1Q/e8RiQkhD/2groySLDQ4
hrySTRjsuVANMSydUjNCoLiPh/MjFJzP5cNUgx5iDHo0WKPnUeSdx3KbiYmqRz8U
W36cVb9wvsnsL3FDQoMxSNoFQgHp7ML0ccRwipJxJ7l3AQ+46/ZHR/Y7emBiAyFt
wp4snL0c0zrYMLylVLOu4sHXzAYzuZ1u1+Wtjp8Aoj3ieddsyzc/vQ8uG2f/mT+b
crbY84mJTMjHdSIjRp9t2+O17WC1MDSDdKSf8EVYsZ0iOJHJCkz6mOevg1sHclk=
=o4H2
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
25985          index.js      96fdaef231a3cb542fde971cec534fe6377b3884150d831bbba8895f3c50bba4
12272          index.map     4c136f49dbc684108906988810fd3bd38c77dc4e1c12c480bfb5cfb9485ef676
609            package.json  371dbb5241502d9078c8f41264b6f7dec9718504ce2617e9cc4e347c7d6a4993
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