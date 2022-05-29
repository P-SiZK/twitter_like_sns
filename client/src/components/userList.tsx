import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

type Props = {
  users: {
    id: string;
    name: string;
    bio: string;
  }[];
};

export const UserList: React.FC<Props> = ({ users }) => {
  const navigate = useNavigate();

  const redirectUserProfile = (id: string) => () => navigate(`/${id}`);

  return (
    <Wrapper>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <UserBox onClick={redirectUserProfile(user.id)}>
                <UserIcon>
                  <IconImg
                    src="/twitter_icon.png"
                    alt={user.id}
                    onClick={redirectUserProfile(user.id)}
                  />
                </UserIcon>
                <UserInfo>
                  <UserName onClick={redirectUserProfile(user.id)}>
                    {user.name}
                  </UserName>
                  <UserID onClick={redirectUserProfile(user.id)}>
                    @{user.id}
                  </UserID>
                  <UserBio>{user.bio}</UserBio>
                </UserInfo>
              </UserBox>
            </li>
          ))}
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      border: 1px solid #5a5a78;
      border-top: none;
    }
  }
`;

const UserBox = styled.div`
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
  display: flex;
  padding: 0 16px;
`;

const UserIcon = styled.div`
  margin-right: 12px;
`;

const IconImg = styled.img`
  cursor: pointer;
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
  margin-bottom: 12px;
`;

const UserName = styled.div`
  font-weight: bold;
`;

const UserID = styled.div`
  color: #8899a6;
`;

const UserBio = styled.div`
  overflow-wrap: break-word;
  white-space: pre-wrap;
  word-wrap: break-word;
`;
