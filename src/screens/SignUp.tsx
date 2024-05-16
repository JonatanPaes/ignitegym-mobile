import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  Center,
  Heading,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack
} from 'native-base'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api'
import * as yup from 'yup'

import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useAuth } from '@hooks/useAuth'

import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'

import { AppError } from '@utils/AppError'

type FormDataProps = {
  name: string
  email: string
  password: string
  password_confirm: string
}

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('informe o e-mail.').email('E-mail inválido.'),
  password: yup
    .string()
    .required('informe a senha.')
    .min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  password_confirm: yup
    .string()
    .required('Confirme a senha.')
    .oneOf([yup.ref('password')], 'A confirmação da senha não confere.')
})

type FormData = yup.InferType<typeof signUpSchema>

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema)
  })

  const { goBack } = useNavigation()

  const toast = useToast()
  const { signIn } = useAuth()

  function handleGoBack() {
    goBack()
  }

  async function handleSignUp(data: FormDataProps) {
    const { name, email, password } = data

    try {
      setIsLoading(true)
      await api.post('/users', {
        name,
        email,
        password
      })

      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)
      const isAppError = error instanceof AppError

      const title = isAppError
        ? error.message
        : 'Não foi possível criar a conta. Tente novamente mais tarde'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10} pb={16}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text color="gray.100" fontSize="sm">
            Treine sua mente e o seu corpo.
          </Text>
        </Center>

        <Center>
          <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
            Crie sua conta
          </Heading>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirme a Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Button
          title="Voltar para o login"
          variant="outline"
          mt={12}
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
