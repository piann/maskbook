"use client";

import Layout from "@/app/_components/layout";
import useMutation from "@/lib/client/use-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface SignInForm {
  email: string;
  password: string;
}

interface SignInPostResponse {
  ok: boolean;
}

export default function SignIn() {
  const router = useRouter();

  // onChange 모드 → 입력 즉시 에러 표기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({ mode: "onChange" });

  const [postSignIn, { loading, data, error }] =
    useMutation<SignInPostResponse>("/api/user/sign-in");

  const onValid = async (formData: SignInForm) => {
    if (loading) return;
    try {
      await postSignIn(formData);
      if (data?.ok) {
        router.push("/");
      }
    } catch (e) {
      // Handle network or other unexpected errors
      console.error("Sign-in failed:", e);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Layout>
      <FormContainer>
        <FormBox onSubmit={handleSubmit(onValid)}>
          <Title>Sign In</Title>

          <Label>이메일 주소</Label>
          <Input
            {...register("email", {
              required: "이메일은 필수입니다.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "올바른 이메일 형식이 아닙니다.",
              },
            })}
            type="email"
            placeholder="example@email.com"
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}

          <Label>비밀번호</Label>
          <Input
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다.",
              },
            })}
            type="password"
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}

          <ExtraRow>
            <small>
              계정이 없으신가요?&nbsp;
              <Link href="/sign-up">회원가입</Link>
            </small>
            <Link href="/forgot-password">비밀번호 찾기</Link>
          </ExtraRow>

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "로그인 중..." : "로그인"}
          </SubmitButton>
        </FormBox>
      </FormContainer>
    </Layout>
  );
}

/* ---------------- styled-components ---------------- */

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  max-width: 500px;
  width: 100%;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  padding: 20px 26px 32px 26px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 32px;
  text-align: center;
`;

const Label = styled.label`
  font-size: 14px;
  margin-top: 14px;
  margin-bottom: 6px;
  display: block;
  font-weight: 500;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 10px 12px;
  margin-bottom: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #999;
  }
`;

const ExtraRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 12px 0 20px;
  font-size: 12px;

  a {
    color: #555;
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #e49a18;
  color: white;
  font-weight: bold;
  padding: 12px 0;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #cf8a10;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 10px;
  margin: 0 0 12px;
`;
