import React from 'react';
import styles from '@/styles/about.module.css';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className={styles.container}>

      <Image 
        className={styles.aboutImage}
          src="/img/about-us-img.jpg"
          alt="Beach front"
          fill
      />

      <div className={styles.aboutTitle}>
        <h1>About Us</h1>
      </div>

      <div className={styles.aboutus}>
        <p> Welcome to Duck's Nest, the ultimate destination for adventurous souls seeking a blend of exotic experiences and luxurious accommodations.</p>

        <p> At Duck's Nest, we understand the desires of young travelers who crave unique journeys, exploring far-flung corners of the world while indulging
          in the comforts of a splendid hotel. </p>

        <p> Our carefully curated collection of properties offers a harmonious fusion of captivating environments, from lush rainforests to serene beaches
          and awe-inspiring mountains. Immerse yourself in the wonders of nature and cultural richness. </p>

        <p> Browse through our selection of exquisite rooms and book your ideal retreat with just a few clicks. </p>

        <p> Whether you seek a cozy cabin nestled in the wilderness or a luxurious suite overlooking breathtaking landscapes, our diverse range of accommodations
          caters to every taste and preference.</p>

        <p> Let Duck's Nest be your trusted companion as you create lifelong memories in the world's most enchanting destinations.</p>

        <p> Book your room today and embark on a remarkable experience that will leave you craving for more.</p>
      </div>
    </div>
  );
};

export default AboutPage;
