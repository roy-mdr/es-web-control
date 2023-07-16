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
    },
    {
      _id: "relay8x_gus",
      type: "8xry",
      name: "8x Relay",
      description: "8x Relay Gus",
      ep: "controll/relay/relay8x_gus/res",
      actions: [
        {
          controller: "ctrl_8xry-0001",
          desc: "[1] ON",
          cmd: "turn_on-1",
          execute: {
            etype: "ry_ctrl-on",
            detail: 1
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[1] Off",
          cmd: "turn_off-1",
          execute: {
            etype: "ry_ctrl-off",
            detail: 1
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[1] INFO",
          cmd: "get_state-1",
          execute: {
            etype: "ry_ctrl-state",
            detail: 1
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[2] ON",
          cmd: "turn_on-2",
          execute: {
            etype: "ry_ctrl-on",
            detail: 2
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[2] Off",
          cmd: "turn_off-2",
          execute: {
            etype: "ry_ctrl-off",
            detail: 2
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[2] INFO",
          cmd: "get_state-2",
          execute: {
            etype: "ry_ctrl-state",
            detail: 2
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[3] ON",
          cmd: "turn_on-3",
          execute: {
            etype: "ry_ctrl-on",
            detail: 3
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[3] Off",
          cmd: "turn_off-3",
          execute: {
            etype: "ry_ctrl-off",
            detail: 3
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[3] INFO",
          cmd: "get_state-3",
          execute: {
            etype: "ry_ctrl-state",
            detail: 3
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[4] ON",
          cmd: "turn_on-4",
          execute: {
            etype: "ry_ctrl-on",
            detail: 4
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[4] Off",
          cmd: "turn_off-4",
          execute: {
            etype: "ry_ctrl-off",
            detail: 4
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[4] INFO",
          cmd: "get_state-4",
          execute: {
            etype: "ry_ctrl-state",
            detail: 4
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[5] ON",
          cmd: "turn_on-5",
          execute: {
            etype: "ry_ctrl-on",
            detail: 5
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[5] Off",
          cmd: "turn_off-5",
          execute: {
            etype: "ry_ctrl-off",
            detail: 5
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[5] INFO",
          cmd: "get_state-5",
          execute: {
            etype: "ry_ctrl-state",
            detail: 5
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[6] ON",
          cmd: "turn_on-6",
          execute: {
            etype: "ry_ctrl-on",
            detail: 6
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[6] Off",
          cmd: "turn_off-6",
          execute: {
            etype: "ry_ctrl-off",
            detail: 6
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[6] INFO",
          cmd: "get_state-6",
          execute: {
            etype: "ry_ctrl-state",
            detail: 6
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[7] ON",
          cmd: "turn_on-7",
          execute: {
            etype: "ry_ctrl-on",
            detail: 7
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[7] Off",
          cmd: "turn_off-7",
          execute: {
            etype: "ry_ctrl-off",
            detail: 7
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[7] INFO",
          cmd: "get_state-7",
          execute: {
            etype: "ry_ctrl-state",
            detail: 7
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[8] ON",
          cmd: "turn_on-8",
          execute: {
            etype: "ry_ctrl-on",
            detail: 8
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[8] Off",
          cmd: "turn_off-8",
          execute: {
            etype: "ry_ctrl-off",
            detail: 8
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "[8] INFO",
          cmd: "get_state-8",
          execute: {
            etype: "ry_ctrl-state",
            detail: 8
          }
        },
        {
          controller: "ctrl_8xry-0001",
          desc: "ALL INFO",
          cmd: "get_state-all",
          execute: {
            etype: "ry_ctrl-state_all",
            detail: null
          }
        }
      ]
    }
  ]