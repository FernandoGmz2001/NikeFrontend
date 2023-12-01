import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.css';

function ErrorPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Error Page</h1>
            <p className={styles.message}>Oops! Something went wrong.</p>
            <Link to="/"><button className={styles.btnReturn}>Go back</button></Link>
        </div>
    );
}

export default ErrorPage;