interface IBrandsIconProps {
  width?: number;
  height?: number;
  filled?: boolean;
  fill?: string;
}
const BrandsIcon: React.FC<IBrandsIconProps> = ({ width = 20, height = 20, filled = false, fill = '#222222' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={width}
      width={height}
      viewBox="0 0 48 48"
      fill={filled ? '#f44336' : fill}
    >
      <path d="M24 46.3 9 35q-.65-.5-.975-1.275Q7.7 32.95 7.7 32.1V7q0-1.35 1.025-2.375T11.1 3.6h25.8q1.4 0 2.4 1.025T40.3 7v25.1q0 .85-.3 1.625T39 35Zm0-4.3 12.9-9.9V7H11.1v25.1Zm-2.1-12 11.4-11.35-2.25-2.2-9.2 9.2-4.95-5-2.2 2.25ZM24 7H11.1h25.8Z" />
    </svg>
  );
};

export default BrandsIcon;
