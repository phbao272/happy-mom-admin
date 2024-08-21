import { Provider } from "jotai";

interface Props {
  children: React.ReactNode;
}

const JotaiProvider = ({ children }: Props) => {
  return <Provider>{children}</Provider>;
};

export default JotaiProvider;
