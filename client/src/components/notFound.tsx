import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => (
  <div className="NotFound">
    <h1>404 Not Found</h1>
    <p>指定されたページが見つかりません。</p>
    <Link to="/">ホームへ戻る</Link>
  </div>
);
