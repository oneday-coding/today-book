import Header from "../../layout/Header";
import MyMain from "./main/MyMain";

export default function MyIndex() {
  return (
    <>
      <Header>
        <h1 className="page-title">내 정보</h1>
      </Header>
      <MyMain />
    </>
  );
}
