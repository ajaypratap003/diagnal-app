import { FC, useEffect, useState, useCallback } from 'react';
import useFetch from '../../Hooks/useFetch';
import { CONSTANT } from '../../constants'
import { MusicResponse, Content } from '../../types';
import { Loader } from '../../components/Loader';

const Products: FC<{}> = () => {
    const [products, setProducts] = useState<Content[]>([]);
    const [fetchProducts, { data, loading, error }] = useFetch<MusicResponse>();
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        fetchProducts(`${CONSTANT.baseApi}/page${page}.json`);
    }, [page]);

    useEffect(() => {
        if (!loading && data) {
            setProducts((prevState) => [...prevState, ...data.page['content-items'].content]);
        }
    }, [data, loading]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 && !loading) {
            fetchProducts(`${CONSTANT.baseApi}/page${page}.json`);
            //setPage((prevPage) => prevPage + 1);
        }
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, page]);

    return (
        <>
            <Header title={data?.page?.title || ''} />
            <div className='wrapper'>
                {products?.map((product: Content, index) => {
                    const { name, 'poster-image': imageName } = product;
                    return (
                        <Product key={index} imageName={imageName} name={name} />
                    );
                })}
                {loading && (
                    <>
                        <Loader />
                        <Loader />
                        <Loader />
                    </>
                )}
                {error && <span>Error: {error}</span>}
            </div>
        </>
    );
};

export default Products;

type HeaderProps = {
    title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
    return (
        <div className='app-header'>
            <span>{title}</span>
            <span className='search-filter'>
                <img src='https://img.icons8.com/?size=100&id=7695&format=png&color=FFFFFF' height='50' width='50' />
            </span>
        </div>
    );
}

export type ProductProps = {
    name: string;
    imageName: string;
};

const Product: FC<ProductProps> = ({ imageName, name }) => {

    return (
        <div className='card'>
            <img src={`https://test.create.diagnal.com/images/${imageName}`} alt={name} width='300' height='300px' />
            <h1>{name}</h1>
        </div>
    );
}