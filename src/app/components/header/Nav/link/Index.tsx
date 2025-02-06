import styles from './styles.module.scss';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '../../animation';

interface IndexProps {
  data: {
    title: string;
    href: string;
    index: number;
  };
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
}

export default function Index({ data, isActive, setSelectedIndicator }: IndexProps) {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide} // Ensure the 'slide' variant is defined in your animation
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        variants={scale} // Ensure the 'scale' variant is defined in your animation
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      />
      <Link href={href}>
        <a>{title}</a> {/* Ensure to wrap Link content in <a> tag for proper behavior */}
      </Link>
    </motion.div>
  );
}
