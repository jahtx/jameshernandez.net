import TopAdBanner from 'components/TopAdBanner';
import { AdvancedThemeProvider } from 'wrappers/AdvancedThemeContext';
import UpsilonFooter from './UpsilonFooter';
import 'styles/index.scss';
import './MainLayout.scss';

type MainLayoutProps = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): JSX.Element => {
  return (
    <AdvancedThemeProvider>
      <div className="outermostWrapper d-flex flex-column p-0">
        <TopAdBanner />
        <div className="mainChildrenArea">{children}</div>
        <UpsilonFooter />
      </div>
    </AdvancedThemeProvider>
  );
};

export default MainLayout;
