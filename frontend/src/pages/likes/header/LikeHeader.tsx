import Logo from '../../../components/Logo';

export default function LikeHeader() {
  return (
    <div className="layout-header relative">
      <Logo />
      <h1 className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        찜 목록
      </h1>
    </div>
  );
}
