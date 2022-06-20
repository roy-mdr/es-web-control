export default [
    {
      _id: "led_wemos0001",
      type: "led",
      name: "Wemos Led",
      description: "Foquito led montado en WeMos",
      ep: "controll/led/led_wemos0001/res",
      actions: [
        {
          controller: "ctrl_wemos0001",
          desc: "Turn On",
          cmd: "turn_on"
        },
        {
          controller: "ctrl_wemos0001",
          desc: "Turn Off",
          cmd: "turn_off"
        },
        {
          controller: "ctrl_wemos0001",
          desc: "Get State",
          cmd: "get_state"
        }
      ],
      last_state: {
        status: 0
      }
    },
    {
      _id: "pc_kappa",
      type: "pc",
      name: "Kappa",
      ep: "controll/pc/pc_kappa/res",
      actions: [
        {
          controller: "wol_ES",
          desc: "Turn On",
          cmd: "turn_on"
        },
        {
          controller: "nodejs_kappa",
          desc: "Turn Off",
          cmd: "turn_off"
        },
        {
          controller: "nodejs_kappa",
          desc: "Sleep",
          cmd: "sleep"
        },
        {
          controller: "nodejs_kappa",
          desc: "Message User",
          cmd: "msg",
          details: {
            user: "",
            message: ""
          }
        },
        {
          controller: "nodejs_kappa",
          desc: "Send to clipboard",
          cmd: "clipboard",
          details: {
            user: "",
            text: ""
          }
        },
        {
          controller: "nodejs_kappa",
          desc: "Get users",
          cmd: "g_users"
        },
        {
          controller: "nodejs_kappa",
          desc: "Get active sessions",
          cmd: "g_sessions"
        },
        {
          controller: "wol_jdm",
          desc: "Get status",
          cmd: "g_status"
        }
      ],
      last_state: {
        status: 0,
        tmp: 0,
        hum: 0,
        session: [],
        expanded: false
      }
    },
    {
      _id: "demo",
      type: "pc",
      name: "Demo",
      ep: "controll/pc/demo/res",
      actions: [
        {
          controller: "wol_ES_demo",
          desc: "Turn On",
          cmd: "turn_on"
        },
        {
          controller: "nodejs_kappa_demo",
          desc: "Turn Off",
          cmd: "turn_off"
        },
        {
          controller: "nodejs_kappa_demo",
          desc: "Sleep",
          cmd: "sleep"
        },
        {
          controller: "nodejs_kappa_demo",
          desc: "Message User",
          cmd: "msg",
          details: {
            user: "",
            message: ""
          }
        },
        {
          controller: "nodejs_kappa_demo",
          desc: "Send to clipboard",
          cmd: "clipboard",
          details: {
            user: "",
            text: ""
          }
        },
        {
          controller: "nodejs_kappa_demo",
          desc: "Get users",
          cmd: "g_users"
        },
        {
          controller: "nodejs_kappa_demo",
          desc: "Get active sessions",
          cmd: "g_sessions"
        },
        {
          controller: "wol_jdm_demo",
          desc: "Get status",
          cmd: "g_status"
        }
      ],
      last_state: {
        status: 0,
        tmp: 0,
        hum: 0,
        session: [],
        expanded: false
      }
    },
    {
      _id: "pc_omega",
      type: "pc",
      name: "Omega",
      ep: "controll/pc/pc_omega/res",
      actions: [
        {
          controller: "wol_ES",
          desc: "Turn On",
          cmd: "turn_on"
        },
        {
          controller: "nodejs_omega",
          desc: "Turn Off",
          cmd: "turn_off"
        },
        {
          controller: "nodejs_omega",
          desc: "Sleep",
          cmd: "sleep"
        },
        {
          controller: "nodejs_omega",
          desc: "Message User",
          cmd: "msg",
          details: {
            user: "",
            message: ""
          }
        },
        {
          controller: "nodejs_omega",
          desc: "Send to clipboard",
          cmd: "clipboard",
          details: {
            user: "",
            text: ""
          }
        },
        {
          controller: "nodejs_omega",
          desc: "Get users",
          cmd: "g_users"
        },
        {
          controller: "nodejs_omega",
          desc: "Get active sessions",
          cmd: "g_sessions"
        },
        {
          controller: "wol_jdm",
          desc: "Get status",
          cmd: "g_status"
        }
      ],
      last_state: {
        status: 0,
        tmp: 0,
        hum: 0,
        session: [],
        expanded: false
      }
    },
    {
      _id: "pc_phi",
      type: "pc",
      name: "Phi",
      ep: "controll/pc/pc_phi/res",
      actions: [
        {
          controller: "wol_jdm",
          desc: "Turn On",
          cmd: "turn_on"
        },
        {
          controller: "nodejs_phi",
          desc: "Turn Off",
          cmd: "turn_off"
        },
        {
          controller: "nodejs_phi",
          desc: "Sleep",
          cmd: "sleep"
        },
        {
          controller: "nodejs_phi",
          desc: "Message User",
          cmd: "msg",
          details: {
            user: "",
            message: ""
          }
        },
        {
          controller: "nodejs_phi",
          desc: "Send to clipboard",
          cmd: "clipboard",
          details: {
            user: "",
            text: ""
          }
        },
        {
          controller: "nodejs_phi",
          desc: "Get users",
          cmd: "g_users"
        },
        {
          controller: "nodejs_phi",
          desc: "Get active sessions",
          cmd: "g_sessions"
        },
        {
          controller: "wol_jdm",
          desc: "Get status",
          cmd: "g_status"
        }
      ],
      last_state: {
        status: 0,
        tmp: 0,
        hum: 0,
        session: [],
        expanded: false
      }
    },
    {
      _id: "tmphum_dht11_site",
      type: "tmphum",
      name: "Site",
      ep: "controll/led/read_dht11_site/res",
      actions: [],
      last_state: {
        status: 0
      }
    }
  ]