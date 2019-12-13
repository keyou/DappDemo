App = {
  web3Provider: null,
  contracts: {},
  test: null,

  init: async function () {
    App.web3Provider = window.ethereum;
    try {
      // Request account access
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error("User denied account access")
    }
    $.getJSON('Test.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      App.contracts.Test = TruffleContract(data);

      // Set the provider for our contract
      App.contracts.Test.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.getResult();
    });

    $('.btn-click').on('click', App.handleClick);
  },

  getResult: function () {

    web3.eth.getAccounts(function (error, accounts) {
      if (error) {
        console.log(error);
        return;
      }
      var account = accounts[0];
      console.log("account: "+account);
      App.contracts.Test.deployed().then(function (instance) {
        App.test = instance;
        return instance.getData.call();
      }).then(function (times) {
        $('.btn-click').text(account + " click: " + times);
      }).catch(function (err) {
        console.log(err.message);
      });
    });
  },

  handleClick: function (event) {
    event.preventDefault();
    App.test.click(1).then(function(){
      return App.getResult();
    }).catch(function (err) {
      console.log(err.message);
    });
    $('.btn-click').text("saving...");
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});
