import { FC } from 'react';
import './Loader.css';

export const Loader: FC = () => {
    return (
        <div className="shimmer-wrapper">
            <div className='shimmerBG'></div>
        </div>
    );
};