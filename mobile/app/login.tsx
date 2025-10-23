import { Text, View, TextInput, TouchableOpacity } from "react-native";

const login = () => {
  const Login = setLogin;

  return (
    <View>
      <View>
        <Text>Login Screen</Text>

        <View>
          <Text> IRIGUCHI</Text>
        </View>

        <View>
          <Text>USUARIO</Text>
          <TextInput placeholder="USUARIO"></TextInput>

          <Text>CONTRASEÑA</Text>
          <TextInput placeholder="CONTRASEÑA"></TextInput>
          <View>
            <TouchableOpacity>
              <Text>login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default login;
