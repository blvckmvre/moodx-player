import { Flex, Image } from '@chakra-ui/react'
import { FC } from 'react'
import appLogo from "../../assets/moodx_logo.png"

const AppHeader: FC = () => {
  return (
    <Flex justify="center" align="center" h="75">
      <Image draggable="false" w="20" src={appLogo} />
    </Flex>
  )
}

export default AppHeader