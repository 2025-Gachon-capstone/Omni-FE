import styled from '@emotion/styled';
import { Banner } from '../features/shop/home/ui/Banner';
import { CategoryList } from '../features/shop/home/ui/CategoryList';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductItem } from '../features/shop/home/type/Product';
import { ProductItems } from '../features/shop/home/ui/ProductItems';
import { Pagination } from '../shared/ui';

const SIZE = 8;

const ShopHome = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalElements, setTotalElements] = useState(0); // 전체 데이터 개수

  const [searchParams, setSearchParams] = useSearchParams();
  const departmentId = searchParams.get('departmentId') ?? '';
  const page = Number(searchParams.get('page') ?? '1');

  useEffect(() => {
    // 상품 목록 불러오기 (예시)
    setProducts([
      {
        productId: 1,
        departmentId: 1,
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1: 'https://buly.kr/AF041k0',
      },
      {
        productId: 2,
        departmentId: 1,
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1: 'https://buly.kr/AF041k0',
      },
      {
        productId: 3,
        departmentId: 1,
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1: 'https://buly.kr/AF041k0',
      },
      {
        productId: 4,
        departmentId: 1,
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOwwAkodNfe6Q6om2bz1Z75q0ifuTKIumJzw&s',
      },
      {
        productId: 5,
        departmentId: 1,
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1: 'https://buly.kr/AF041k0',
      },
      {
        productId: 6,
        departmentId: 1,
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1: 'https://buly.kr/AF041k0',
      },
      {
        productId: 7,
        departmentId: 1,
        departmentName: '생활',
        productName: '페리오치약',
        price: 4000,
        companyName: '이마트',
        image1: 'https://buly.kr/AF041k0',
      },
    ]);
    setTotalElements(7);
  }, [departmentId, page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ departmentId, page: String(newPage) });
  };
  return (
    <Container>
      <Banner />
      <CategoryList />
      <ProductItems products={products} />
      <Pagination
        page={page}
        size={SIZE}
        totalElements={totalElements}
        onPageChange={handlePageChange}
      />
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
