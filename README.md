# Nexus NFT Market Module

A module for accessing Nexus NFT Tokens
<br>

### <ins>References</ins>
Templated From Repo: [react_redux_module_example](https://github.com/Nexusoft/react_redux_module_example) \
Development Reference: [Nexus-Interface-Invoid-Module](https://github.com/Nexusoft/Nexus-Interface-Invoice-Module) \
Nexus Github Page: [Github Nexusoft](https://github.com/Nexusoft) \
Reddit Post: [NFT Marketplace Request](https://www.reddit.com/r/nexusearth/comments/j2c3b5/seeking_developer_for_simple_nonfungibletoken/) \
Module Documentation: [Docs](https://github.com/Nexusoft/NexusInterface/tree/master/docs/Modules) \
APIDocs: [Docs](https://github.com/Nexusoft/NexusInterface/tree/42b9a5a9187fc0fd7d92a590402c9c2282ddf27e/src/App/Terminal/APIDocs)
### <ins>Tokens & Assets</ins>

Sia Asset (Red Eye): 893G5vSSDUBrMAU4bDhsx5PurSEnjtHTiF4mVhpxKgjht2qB3DF\
Sia Asset (Cellular Expression): 87VY3YVQBGt7SzGmSs4Ndri459p49wrZcPKC3QLYXgr3MFLL3qc\
Token Object: 8DEbUDvA5D9ngoPMqDxJpBgtBJb9xPB9uJEWpdnZ57vEp89kq6t


ipfs initialization: ipfs cat /ipfs/QmQPeNsJPyVWPFDVHb77w8G42Fvo15z4bG2X8D2GhfbSXc/readme


From Mitote
- Assets are NFTs
- Tokenizing assets makes the ownership distributed to the supplied token object register, so revenue streams could be split between the owners of the token for certain use cases.
- 

Similar Use Case: https://superrare.co/
- NFT market for Digital Artworks

TODO
- Get and display { Asset Name, Asset Address, Preview Data, Price }
  - Transfer ownership of NFT
- List available NFTs for purchase
  - How to retrieve list of assets? Store address on creation?
- How to use Tab???

- user can view information about an asset. [ Name, Address, Data, Price ]
- user can create assets. [ Set Name, Set Price, Set Asset Link, Delete Asset(?) ]
  - user can choose whether or not to list asset on market
- user can view and manage owned assets
- user can transfer ownership assets to another Address. [ Address ]
- user can claim token that was transferred to them. [ pin, session(?mulituser), txid (of asset transfer), name: (optional) ]
- user can update assets. [ pin, name, field1, field2 ]

- Import npm pacakges not working? -- tried importing react
- How would the purchase mechanism work?
  - Click purchase -> validate user has enough NXS -> Send Nxs -> Get confirmation -> Trasfer ownership of token -> purchaser claims token
- Validate data? *Must be sia/ipfs domain.
  - Ensuring only validat links are stored ensure the data will always be available.
- Where to store Asset Addresses that will be displayed on the market place?

pages
- market
- manage tokens
  - create
  - update
- view token information
