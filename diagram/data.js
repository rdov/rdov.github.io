var data = {
  components: {
    routed: {
      title: 'Components directly used in routing (click in a component for more information).',
      elements: [
        {name: 'App', link: 'app'},
        {linebreak: true},
        {name: 'section/Welcome', pretty: 'section/\nWelcome', link: 'welcome'},
        {name: 'widget/Invoice', pretty: 'widget/\nInvoice', link: 'invoice'},
        {name: 'Account', link: 'account'},
        {name: 'ActiveRoute', hide: true, style: {'stroke-dasharray': '5,5'}},
        {linebreak: true},
        {name: 'section/SignupForm', pretty: 'section/\nSignupForm', link: 'welcome'},
        {name: 'section/NotFound', pretty: 'section/\nNotFound', link: 'notfound'},
        {name: 'section/Wallet', pretty: 'section/\nWallet', link: 'wallet'},
        {name: 'section/Send', pretty: 'section/\nSend', link: 'send'},
        {name: 'section/Receive', pretty: 'section/\nReceive', link: 'receive'},
        {name: 'section/ReceiveSimple', pretty: 'section/\nReceiveSimple', link: 'receive'},
        {name: 'section/ReceiveInvoice', pretty: 'section/\nReceiveInvoice', link: 'receive'},
        {linebreak: true},
        {name: 'section/LoginForm', pretty: 'section/\nLoginForm', link: 'welcome'},
        {skip: true},
        {name: 'section/Convert', pretty: 'section/\nConvert', link: 'convert'},
        {name: 'widget/Invoice2', pretty: 'widget/\nInvoice', link: 'invoice'},
        {name: 'section/History', pretty: 'section/\nHistory', link: 'history'},
        {name: 'section/HistoryBitcoin', pretty: 'section/\nHistoryBitcoin', link: 'history'},
        {name: 'section/HistoryExternal', pretty: 'section/\nHistoryExternal', link: 'history'},
        {linebreak: true},
        {skip: true}, {skip: true},
        {name: 'section/TxDetail', pretty: 'section/\nTxDetail', link: 'txdetail'},
        {name: 'Logout', link: 'logout'},
      ],
    },
    others: {
      title: 'Components used by other components.',
      elements: [
        {name: 'section/Header', pretty: 'section/\nHeader'},
        {name: 'section/Footer', pretty: 'section/\nFooter'},
        {name: 'Logo'},
        {name: 'TableFilter'},
        {name: 'widget/PendingTx', pretty: 'widget/\nPendingTx'},
        {name: 'widget/Balance', pretty: 'widget/\nBalance'},
        {name: 'widget/BoxMessage', pretty: 'widget/\nBoxMessage'},
        {name: 'widget/SlideMenu', pretty: 'widget\nSlideMenu'},
        {name: 'widget/CurrentAddress', pretty: 'widget/\nCurrentAddress'},
        {name: 'widget/Ticker', pretty: 'widget/\nTicker'},
        {name: 'widget/Dropdown', pretty: 'widget/\nDropdown'},
        {name: 'widget/DayPicker', pretty: 'widget/\nDayPicker'}
      ]
    }
  },

  actions: {
    title: 'Click in an action for\nmore information.',
    elements: [
      {name: 'LoginAction', link: 'loginAction'},
      {name: 'SignupAction', link: 'signupAction'},
      {name: 'LocaleAction', link: 'localeAction'},
      {name: 'WalletAction', link: 'walletAction'},
      {name: 'WalletSendAction', pretty: 'WalletSend\nAction', link: 'sendAction'},
      {name: 'InvoiceAction', link: 'invoiceAction'},
      {name: 'ConvertAction', link: 'convertAction'}
    ],
  },

  stores: {
    title: 'Click in a store for more information.',
    elements: [
      {name: 'LoginStore', link: 'loginStore'},
      {name: 'LocaleStore', link: 'localeStore'},
      {name: 'BalanceStore', link: 'balanceStore'},
      {name: 'TickerStore', link: 'tickerStore'},
      {name: 'InvoiceStore', link: 'invoiceStore'},
      {name: 'ConvertStore', link: 'converStore'},
      {name: 'PayExternalStore', pretty: 'PayExternal\nStore', link: 'payExternalStore'},
      {name: 'TxDetailStore', link: 'txStore'},
      {name: 'WalletCosignStore', pretty: 'WalletCosign\nStore', link: 'cosignStore'},
      {name: 'WalletSendStore', pretty: 'WalletSend\nStore', link: 'sendStore'},
      {name: 'HistoryExternalStore', pretty: 'HistoryExternal\nStore', link: 'historyExternalStore'},
      {name: 'WalletHistoryStore', pretty: 'WalletHistory\nStore', link: 'walletHistoryStore'},
      {name: 'WalletStore', link: 'walletStore'}
    ]
  }
};


data.diagram = {

  app: {
    actions: ['LocaleAction'],
    stores: ['LoginStore', 'LocaleStore'],
    components: {
      others: ['section/Header', 'section/Footer', 'Logo', 'widget/SlideMenu'],
      routed: ['App', 'ActiveRoute']
    },
    links: [
      ['LocaleAction', 'LocaleStore'],
      ['App', 'LoginStore'],
      ['App', 'LocaleStore'],
      {source: 'Logo', target: 'section/Header', head: true},
      ['section/Footer', 'LocaleAction'],
      {source: 'widget/SlideMenu', target: 'App', head: true},
      {source: 'section/Header', target: 'App', head: true},
      {source: 'section/Footer', target: 'App', head: true},
      {source: 'ActiveRoute', target: 'App', head: true}
    ],
    texts: [
      {
        content: "App is the top-most component, therefore\nit's always active whenever Deglet is open.\n\n\n" +
                 "Responsabilities:\n\n" +
                 " a) Re-render the application in case the current\n  locale changes.\n\n" +
                 " b) Include a header, mobile menu, and footer in\n   every page.\n\n" +
                 " c) Render the currently active route.",
        placement: ['ActiveRoute', {below: 1.5}]
      },
      {
        content: "NOTE\n\nThe header can be hidden on any page by\n" +
                 "adding the query parameter header=0, e.g.:\n" +
                 "http://deglet.xyz/login?header=0",
        placement: ['Logo', {right: 1.35}]
      }
    ]
  },

  welcome: {
    actions: ['LoginAction', 'SignupAction'],
    stores: ['LoginStore'],
    components: {
      others: ['widget/BoxMessage'],
      routed: [
        'section/LoginForm',
        'section/SignupForm',
        'section/Welcome'
      ]
    },
    links: [
      ['LoginAction', 'LoginStore'],
      ['SignupAction', 'LoginStore'],
      ['LoginStore', 'section/LoginForm'],
      ['LoginStore', 'section/SignupForm'],
      {source: 'widget/BoxMessage', target: 'section/LoginForm', head: true},
      {source: 'widget/BoxMessage', target: 'section/SignupForm', head: true},
      ['section/LoginForm', 'LoginAction'],
      ['section/SignupForm', 'SignupAction'],
      {source: 'section/LoginForm', target: 'section/Welcome', head: true},
      {source: 'section/SignupForm', target: 'section/Welcome', head: true}
    ],
    texts: [
      {
        content: "section/Welcome is the initial page that is\nrendered when there is no active user.\n\n\n" +
                 "Responsabilities:\n\n" +
                 " a) before rendering, redirect to section/Wallet\n     if there is an active user.\n\n" +
                 " b) Switch between Sign Up (default) and Log in.",
        placement: ['section/Welcome', {right: 2}]
      }
    ]
  },

  notfound: {
    components: {routed: ['section/NotFound']},
    texts: [
      {
        content: "section/NotFound is displayed whenever a route\n" +
                 "that does not exist is visited.",
        placement: ['section/NotFound', {right: 1.5}]
      }
    ]
  },

  account: {
    actions: ['WalletAction'],
    stores: ['LoginStore', 'WalletStore'],
    components: {routed: ['Account', 'ActiveRoute']},
    links: [
      ['Account', 'LoginStore'],
      ['Account', 'WalletStore'],
      ['Account', 'WalletAction'],
      ['WalletAction', 'WalletStore'],
      {source: 'ActiveRoute', target: 'Account', head: true}
    ],
    texts: [
      {
        content: "Account is the main router when there is an\nactive user.\n\n\n" +
                 "Responsibilites:\n\n" +
                 " a) Before rendering, redirect to section/Welcome\n" +
                 "    if there is no active user.\n\n" +
                 " b) Prepare the local Bitcoin wallet, creating a new\n" +
                 "    one when it is not present (i.e. after a sign up).\n\n" +
                 " c) Update the properties in the active route in\n" +
                 "    case the user's wallet is modified.\n\n" +
                 " d) Render a vertical menu baased on the active\n" +
                 "    route.",
        placement: ['Account', {below: 1.5, right: -0.5}]
      }
    ]
  },

  invoice: {
    actions: ['WalletAction', 'WalletSendAction', 'InvoiceAction'],
    stores: ['InvoiceStore', 'PayExternalStore', 'WalletCosignStore', 'WalletSendStore', 'WalletStore'],
    components: {
      routed: ['Account', 'widget/Invoice', 'widget/Invoice2']
    },
    links: [
      {source: 'widget/Invoice2', target: 'Account', head: true},
      ['widget/Invoice', 'InvoiceAction'],
      ['InvoiceAction', 'InvoiceStore'],
      ['InvoiceStore', 'widget/Invoice'],
      ['widget/Invoice2', 'WalletAction'],
      ['widget/Invoice2', 'WalletSendAction'],
      ['widget/Invoice2', 'InvoiceAction'],
      ['WalletSendAction', 'WalletSendStore'],
      ['WalletAction', 'PayExternalStore'],
      ['WalletAction', 'WalletCosignStore'],
      ['WalletSendStore', 'widget/Invoice2'],
      ['widget/Invoice2', 'WalletStore'],
      ['PayExternalStore', 'widget/Invoice2'],
      ['InvoiceStore', 'widget/Invoice2'],
      ['WalletCosignStore', 'widget/Invoice2']
    ],
    texts: [
      {
        content: "The invoice widget is used both for displaying\n" +
                 "public invoices as well conversions that can be\n" +
                 "only viewed by Deglet users.\n\n\n" +
                 "General responsabilites:\n\n" +
                 " a) Display the necessary information to pay\n" +
                 "    a transaction.\n\n\n" +
                 "Responsabilities for conversions:\n\n" +
                 " a) Allow completing the transaction\n" +
                 "    within the widget.",
        placement: ['Account', {right: 1.5, below: -2}]
      }
    ]
  },

  wallet: {
    actions: ['WalletAction'],
    stores: ['LoginStore', 'BalanceStore', 'TickerStore', 'WalletCosignStore', 'WalletStore'],
    components: {
      routed: ['Account', 'section/Wallet'],
      others: ['widget/PendingTx', 'widget/Balance', 'widget/CurrentAddress', 'widget/Ticker']
    },
    links: [
      {source: 'section/Wallet', target: 'Account', head: true},
      {source: 'widget/CurrentAddress', target: 'section/Wallet', head: true},
      {source: 'widget/Ticker', target: 'section/Wallet', head: true},
      {source: 'widget/PendingTx', target: 'section/Wallet', head: true},
      {source: 'widget/Balance', target: 'section/Wallet', head: true},
      ['widget/PendingTx', 'WalletAction'],
      ['section/Wallet', 'LoginStore'],
      ['widget/Ticker', 'TickerStore'],
      ['WalletAction', 'BalanceStore'],
      ['widget/Balance', 'BalanceStore'],
      ['WalletAction', 'WalletCosignStore'],
      ['WalletAction', 'WalletStore']
    ],
    texts: [
      {
        content: "section/Wallet is the initial page that is rendered\n" +
                 "when there is an active user.\n\n\n" +
                 "Responsabilities:\n\n" +
                 " a) Aggregate information that is likely to be useful\n" +
                 "    for users in general.",
        placement: ['Account', {right: 1.5}]
      }
    ]
  }

};
