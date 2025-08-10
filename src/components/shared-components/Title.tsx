import { Typography, theme as antTheme } from 'antd';
import type { TitleProps } from 'antd/es/typography/Title';

const { Title: AntTitle } = Typography;

const Title = (props: TitleProps) => {
  const { token } = antTheme.useToken();
  return (
    <AntTitle
      {...props}
      style={{
        marginBottom: 0,
        color: token.colorTextLightSolid,
        ...(props.style || {}),
      }}
    />
  );
};

export default Title;
