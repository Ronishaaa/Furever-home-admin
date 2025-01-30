import {
  Button,
  MantineThemeOverride,
  Menu,
  Modal,
  Table,
  Text,
  Title,
  rem,
} from "@mantine/core";

const theme: MantineThemeOverride = {
  components: {
    Table: Table.extend({
      styles: {
        thead: {
          height: 48,
          backgroundColor: "#F6F6F8",
          borderRadius: 8,
          marginBottom: 8,
        },

        th: {
          padding: 12,
          fontSize: 14,
          fontWeight: 600,
          color: "#49494C",
        },

        tr: {
          border: "none",
        },

        td: {
          height: 52,
          padding: "14px 12px",
          fontSize: 14,
          color: "#1B1B1E",
          alignItems: "center",
          borderBottom: "1px solid #E5E7EB",
        },
      },
    }),

    Button: Button.extend({
      vars: (_, props) => {
        if (props.variant === "outline") {
          return {
            root: {
              "--button-height": rem(40),
              "--button-radius": rem(8),
              "--button-padding-x": rem(16),
              "--button-fz": rem(14),
              "--button-color": "#1B1B1E",
              borderColor: "#AAAAAA",
            },
          };
        }

        return { root: {} };
      },
    }),

    Menu: Menu.extend({
      styles: {
        item: {
          height: 40,
          paddingInline: 16,
          fontSize: 14,
          color: "#49494C",
        },
      },
    }),

    Title: Title.extend({
      styles: {
        root: {
          color: "#1B1B1E",
        },
      },
    }),

    Text: Text.extend({
      styles: {
        root: {
          color: "#1B1B1E",
        },
      },
    }),

    Input: {
      styles: {
        wrapper: {
          borderRadius: rem(8),
          borderColor: "#EDEEF0",
          borderWidth: rem(2),
        },
        input: {
          height: rem(40),
          width: "100%",
          "&:focus": {
            borderColor: "#1B1B1E",
          },
        },
      },
    },

    PasswordInput: {
      styles: {
        wrapper: {
          borderRadius: rem(8),
          borderColor: "#EDEEF0",
          borderWidth: rem(2),
        },
        input: {
          height: rem(40),
          width: "100%",
          "&:focus": {
            borderColor: "#1B1B1E",
          },
        },
      },
    },

    Modal: Modal.extend({
      styles: {
        title: {
          fontSize: 20,
          fontWeight: 700,
          color: "#1C1C1C",
        },
      },
    }),
  },
};

export default theme;
