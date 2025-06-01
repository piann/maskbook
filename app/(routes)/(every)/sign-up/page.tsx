"use client";

import Layout from "@/app/_components/layout";
import useMutation from "@/lib/client/use-mutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignUpPostResponse {
  ok: boolean;
}

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: "onChange" });

  const onValid = (data: SignUpForm) => {
    postSignUp({ email: data.email, password: data.password });
    router.push("/");
  };

  const passwordValue = watch("password");

  // POST
  const [postSignUp, { loading, data, error }] =
    useMutation<SignUpPostResponse>("/api/user/sign-up");

  return (
    <Layout>
      <FormContainer>
        <FormBox onSubmit={handleSubmit(onValid)}>
          <Title>New Account</Title>

          <Label>이메일 주소</Label>
          <Input
            {...register("email", {
              required: true,
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

          <Label>비밀번호 확인</Label>
          <Input
            {...register("confirmPassword", {
              required: "비밀번호 확인이 필요합니다.",
              validate: (value) =>
                value === passwordValue || "비밀번호가 일치하지 않습니다.",
            })}
            type="password"
          />
          {errors.confirmPassword && (
            <ErrorText>{errors.confirmPassword.message}</ErrorText>
          )}

          <AgreementText>
            가입 시 <Link href={"/agreement"}>이용약관</Link> 및 정보제공에
            동의하게 됩니다.
          </AgreementText>

          <SubmitButton type="submit">가입하기</SubmitButton>
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

const AgreementText = styled.p`
  font-size: 12px;
  color: #555;
  margin-top: 8px;
  margin-bottom: 20px;
  line-height: 1.4;
  text-align: center;
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

  &:hover {
    background-color: #cf8a10;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 10px;
  margin: 0 0 12px;
`;
