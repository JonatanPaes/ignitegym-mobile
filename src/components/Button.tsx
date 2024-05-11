import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: ButtonProps) {
  const backgroundColor = variant === 'outline' ? 'transparent' : 'green.700'

  return (
    <ButtonNativeBase
      w="full"
      h={14}
      bg={backgroundColor}
      borderWidth={variant === 'outline' ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: variant === 'outline' ? 'gray.500' : 'green.500'
      }}
      _loading={{
        bg: backgroundColor + '80'
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'green.500' : 'white'}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
