import Aboutus from './components/Aboutus/index';
import Articles from './components/Articles/index';
import Banner from './components/Banner/index';
import Dedicated from './components/Dedicated/index';
import Digital from './components/Digital/index';
import FAQ from './components/FAQ/index';
import Insta from './components/Insta/index';
import Joinus from './components/Joinus/index';
import Testimonials from './components/Testimonials/index';
import Wework from './components/Wework/index';

export default function Home() {
  return (
    <main>
        {
            /**
             * <Banner />
             * <Digital />
             * <Aboutus />
             * <Dedicated />
             * <Beliefs />
             */
        }
      <Articles />
      <Wework />
      
      {
        /**
         * <Ourteam />
         * <Featured />
         * <Manage /> precios
         * <FAQ />
         */
      }
      


      {
        /**
         * <Testimonials />
         * <Brands />
         * <Insta />
         */
      }
      <Joinus />

    </main>
  )
}
