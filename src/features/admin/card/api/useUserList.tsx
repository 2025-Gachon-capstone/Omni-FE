import { useState } from 'react';
import { privateAxios } from '../../../../app/customAxios';
import { toast } from 'react-toastify';
import { SelectedUserResDto, UserCardResDto } from '../type/UserCard';

interface UserCardListResponse {
  cards: UserCardResDto[];
  totalElements: number;
  isFirst: boolean;
  last: boolean;
  pageSize: number;
}

export const useUserList = () => {
  const [loading, setLoading] = useState(false);

  // 전체 유저 정보 가져오기 API
  const getTotalCardList = async ({
    page,
    size,
  }: {
    page: number;
    size: number;
  }): Promise<UserCardListResponse> => {
    setLoading(true);
    let params = {
      page: page,
      size: size,
    };
    try {
      const res = await privateAxios.get('/card/v1/admin/members', { params });
      const data = res.data?.result;

      return {
        cards: data.cards,
        totalElements: data.totalElements,
        isFirst: data.isFirst,
        last: data.last,
        pageSize: data.listSize,
      };
    } catch (err: any) {
      const message = err.response?.data?.message || '유저 정보 불러오기 실패';
      toast.error(message);
      return {
        cards: [],
        totalElements: 0,
        isFirst: true,
        last: false,
        pageSize: size,
      };
    } finally {
      setLoading(false);
    }
  };

  // 특정 유저 정보 API
  const getUserCard = async (memberId: number): Promise<SelectedUserResDto> => {
    setLoading(true);
    try {
      const res = await privateAxios.get(`/card/v1/admin/members/${memberId}`);
      return res.data.result;
    } catch (err: any) {
      const message = err.response?.data?.message || '유저정보 불러오기 실패';
      toast.error(message);
      return {
        memberId: memberId,
        cardId: 0,
        memberName: '',
        cardNumber: '',
        createdAt: '',
        updatedAt: '',
        benefits: [],
      };
    } finally {
      setLoading(false);
    }
  };

  // 특정 유저 삭제 API
  const deleteUser = async (memberId: number) => {
    setLoading(true);
    try {
      const res = await privateAxios.delete(`/user/v1/admin/members/${memberId}`);
      toast.success('해당 유저가 삭제되었습니다.');
      return res.data.isSuccess;
    } catch (err: any) {
      const message = err.response?.data?.message || '유저 삭제 실패';
      toast.error(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, getTotalCardList, getUserCard, deleteUser };
};
