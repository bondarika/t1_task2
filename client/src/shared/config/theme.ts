import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#000000',
    colorPrimaryHover: '#333333',
    colorPrimaryActive: '#000000',
    colorLink: '#000000',
    colorLinkHover: '#333333',
    colorLinkActive: '#000000',
    colorError: '#ff4d4f',
    colorErrorHover: '#ff7875',
    colorErrorActive: '#d9363e',
  },
  components: {
    Button: {
      colorPrimary: '#000000',
      colorPrimaryHover: '#333333',
      colorPrimaryActive: '#000000',
    },
    Menu: {
      itemSelectedBg: '#f0f0f0',
      itemSelectedColor: '#000000',
      itemHoverBg: '#f5f5f5',
      itemHoverColor: '#000000',
    },
    Table: {
      headerBg: '#fafafa',
      headerColor: '#000000',
    },
    Form: {
      labelRequiredMarkColor: '#000000',
    },
    Input: {
      activeBorderColor: '#000000',
      hoverBorderColor: '#333333',
    },
    Select: {
      optionSelectedBg: '#f0f0f0',
      optionSelectedColor: '#000000',
    },
    DatePicker: {
      activeBorderColor: '#000000',
      hoverBorderColor: '#333333',
    },
    Checkbox: {
      colorPrimary: '#000000',
      colorPrimaryHover: '#333333',
    },
  },
};
