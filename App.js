import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Modal,
} from 'react-native';
import Constants from 'expo-constants';

const ShowDetailsModal = ({ display, toogleModal, nickname, portrayed, status }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={display}

    onRequestClose={toogleModal}
  >
    <View style={styles.centeredView} >
      <View style={styles.modalView}>
        <Pressable onPress={toogleModal}>
          <Text style={styles.paragraphModal}>Ator: {portrayed}</Text>
           <Text style={styles.paragraphModal}>Apelido: {nickname}</Text>
            <Text style={styles.paragraphModal}>Status: {status}</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const Item = ({ title, url, thumb,nickname,portrayed, status }) => {
  const [modal, setModal] = React.useState(false);
  function changeModal() {
    setModal(!modal);
  }
  return (
    <View>
      <ShowDetailsModal
        display={modal}
        toogleModal={changeModal}
        nickname={nickname}
        status={status}
        portrayed={portrayed}
      />

      <Pressable onPress={changeModal}>
        <Text style={styles.paragraph}>{title}</Text>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: url,
          }}
        />
      </Pressable>
    </View>
  );
};

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function getData() {
      try {
        const data = await fetch(
          'https://www.breakingbadapi.com/api/characters',
        ).then((response) => response);
        const json = await data.json();
        return json;
      } catch (error) {
        console.log(error);
      }
    }
    getData().then((response) => setData(response));
  }, []);

  function forEachItem({ item }) {
    return <Item title={item.name} url={item.img} thumb={item.img} nickname={item.nickname}
    portrayed={item.portrayed} status={item.status}/>;
  }

  return ( 
    <View style={styles.container}>
          <Text style={styles.paragraph}>Breaking Bad</Text>
      <FlatList
        data={data}
        renderItem={forEachItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={()=><Text style={styles.paragraphHeader}>Personagens</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 12,
    padding: 12,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#fff',
    backgroundColor: 'darkgreen',
    
  },
  paragraphModal:{
    color:'#fff',
    fontWeight:'bold',
    textShadow:'1px 1px 1px #000'
  },
  paragraphHeader:{
    color:'#fff',
    fontWeight:'bold',
    textShadow:'1px 1px 1px #000',
    backgroundColor: 'darkgreen',
    margin: 12,
    padding: 10,
  },
  tinyLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    backgroundSize:'100% 100%'
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:'lightgreen',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
