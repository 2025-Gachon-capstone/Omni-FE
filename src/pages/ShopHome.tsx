import styled from '@emotion/styled';
import { Banner } from '../features/shop/home/ui/Banner';
import { CategoryList } from '../features/shop/home/ui/CategoryList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductItems } from '../features/shop/home/ui/ProductItems';
import { Pagination } from '../shared/ui';
import { ProductList } from '../features/shop/home/type/ProductList';
import { useGetProductList } from '../features/shop/home/api/useGetProductList';
import { LuSearchX } from 'react-icons/lu';
import theme from '../shared/styles/theme';
import Loading from './Loading';

const SIZE = 8;

const ShopHome = () => {
  const { loading, getProductList } = useGetProductList();
  const [products, setProducts] = useState<ProductList[]>([]);
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수

  const [searchParams, setSearchParams] = useSearchParams();
  const departmentId = searchParams.get('departmentId') ?? '';
  const page = Number(searchParams.get('page') ?? 1);

  useEffect(() => {
    const fetchProducts = async () => {
      const params: any = {
        page: Number(page) - 1,
        size: SIZE,
      };

      if (departmentId && departmentId !== '0') {
        params.productCategoryId = departmentId;
      }
      const result = await getProductList(params);

      setProducts(result.Items);
      setTotalElements(result.totalElements);
    };

    fetchProducts();
  }, [departmentId, page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ departmentId, page: String(newPage) });
  };
  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Banner />
      <CategoryList />
      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <EmptyContent>
          <LuSearchX size={40} color={theme.color.main} />
          <div className="empty-title">상품 리스트가 없습니다.</div>
          <div className="empty-subTitle">추가될 상품을 기다려주세요.</div>
        </EmptyContent>
      ) : (
        <>
          <ProductItems products={products} />
          <Pagination
            page={page}
            size={SIZE}
            totalElements={totalElements}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </Container>
  );
};

export default ShopHome;

const Container = styled.div`
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 5rem;
`;

const EmptyContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin: 5rem auto 0 auto;
  font-size: 1.75rem;
  font-weight: 600;

  .empty-subTitle {
    font-size: 1rem;
    font-weight: 300;
  }
`;
