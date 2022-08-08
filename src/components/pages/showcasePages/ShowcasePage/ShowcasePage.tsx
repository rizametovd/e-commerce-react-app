import { Outlet } from 'react-router-dom';
import ShowcaseFooter from '../../../layouts/showcaseLayouts/ShowcaseFooter/ShowcaseFooter';
import ShowcaseHeader from '../../../layouts/showcaseLayouts/ShowcaseHeader/ShowcaseHeader';
import ShowcaseMain from '../../../layouts/showcaseLayouts/ShowcaseMain/ShowcaseMain';
import classes from './ShowcasePage.module.css';

const ShowcasePage: React.FC = () => {
  return (
    <div className={classes.showcase}>
      <ShowcaseHeader />
      <ShowcaseMain>
        <>
          <Outlet />
        </>
      </ShowcaseMain>
      <ShowcaseFooter />
    </div>
  );
};

export default ShowcasePage;
