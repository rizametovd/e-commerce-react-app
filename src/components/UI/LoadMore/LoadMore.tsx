import Button from '../Button/Button';

interface ILoadMoreProps {
  count: number;
  itemsListLength: number;
  onClick: (count: number) => void;
  itemsLimit: number;
}

const LoadMore: React.FC<ILoadMoreProps> = ({ count, itemsListLength, onClick, itemsLimit }) => {
  const clickHandler = () => {
    if (count >= itemsListLength) return;

    count += itemsLimit;
    onClick(count);
  };

  return (
    <Button onClick={clickHandler} mode={'primary'}>
      Показать еще
    </Button>
  );
};

export default LoadMore;
