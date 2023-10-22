import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Modal,
  Button,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { FlatList, TextInput, StatusBar, BackHandler } from 'react-native';

const data = [
  {
    cantor: 'Eminem',
    musica: 'SuperMan',
    img: 'https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b',
    playList: '1',
  },
  {
    cantor: 'Pumapjl',
    musica: 'Intro',
    img: 'https://i.scdn.co/image/ab6761610000e5eb7674b7357c361781ccbb942f',
    playList: '2'
  },
  {
    cantor: 'MacDeMarco',
    musica: 'For the First Time',
    img: 'https://akamai.sscdn.co/uploadfile/letras/albuns/c/f/1/c/351621400611419.jpg',
    playList: '3'
  },
];
const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryMusica, setSearchQueryMusica] = useState('');
  const [searchQueryImg, setSearchQueryImg] = useState('');
  const [selectSearch, setSelectSearch] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisiblePlay, setModalVisiblePlay] = useState(false);
  const [isModalVisiblePlay1, setModalVisiblePlay1] = useState(false);
  const [isModalVisiblePlay2, setModalVisiblePlay2] = useState(false);
  const [soundObject, setSoundObject] = useState(null);
  const filteredData = data.filter((item) =>
    item.cantor.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  const filteredDataMusica = data.filter((item) =>
    item.musica.toLowerCase().startsWith(searchQueryMusica.toLowerCase())
  );

  const [qualTela, setQualTela] = useState(1);

  const iniciar = (item) => {
    if (item.playList == "3"){
      setQualTela(2);
    }else{
      if(item.playList == "2"){
        setQualTela(3)
      }
      else{
        if(item.playList == "1"){
          setQualTela(4)
        }
      }
    }
  };
  useEffect(() => {
  const sound = new Audio.Sound();
  setSoundObject(sound);
  return () => {
    sound.unloadAsync();
  };
  }, []);

  async function carregareTocar() {
  try {
    const source = qualTela === 2
      ? require('./assets/SnapInsta.io - For the First Time (128 kbps).mp3')
      : qualTela === 3
      ? require('./assets/SnapInsta.io - INTRO (128 kbps).mp3')
      : qualTela === 4
      ? require('./assets/SnapInsta.io - Superman (128 kbps).mp3')
      :null;

    if (source) {
      await soundObject.loadAsync(source);
      await soundObject.playAsync();
    }
  } catch (error) {
    console.error('Erro ao carregar e reproduzir a música', error);
  }
}
  async function pausarAudio() {
    try {
      await soundObject.pauseAsync();
    } catch (error) {
      console.error('Erro ao pausar a música', error);
    }
  }
  const voltar = () => {
    setQualTela(1);
  };
  const closeModal = () => {
    setModalVisible(false);
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  };
  const openModal = () => {
    setSelectSearch('cantor');
    setModalVisible(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  };

  const handleBackButton = () => {
    if (isModalVisible) {
      closeModal();
      return true;
    }
    return false;
  };

  const handleBackButton2 = () => {
    if (isModalVisible2) {
      setModalVisible2(false);
      return true;
    }
    return false;
  };
  const handleBackButtonPlay = () => {
    if (isModalVisiblePlay) {
      setModalVisiblePlay(false);
      return true;
    }
    return false;
  };
   const handleBackButtonPlay1 = () => {
    if (isModalVisiblePlay1) {
      setModalVisiblePlay1(false);
      return true;
    }
    return false;
  };
  const handleBackButtonPlay2 = () => {
    if (isModalVisiblePlay2) {
      setModalVisiblePlay2(false);
      return true;
    }
    return false;
  };
  const openModal2 = () => {
    setSelectSearch('musica');
    setModalVisible2(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButton2);
  };
  const closeModal2 = () => {
    setModalVisible2(false);
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton2);
  };
   const openModalPlay = () => {
    setSelectSearch('cantor');
    setModalVisiblePlay(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPlay);
  };
  const closeModalPlay = () => {
    setModalVisiblePlay(false);
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPlay);
  };
  const openModalPlay1 = () => {
    setSelectSearch('cantor');
    setModalVisiblePlay1(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPlay1);
  };
   const closeModalPlay1 = () => {
    setModalVisiblePlay1(false);
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPlay1);
  };
  const openModalPlay2 = () => {
    setSelectSearch('cantor');
    setModalVisiblePlay2(true);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonPlay2);
  };
   const closeModalPlay2 = () => {
    setModalVisiblePlay2(false);
    BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPlay2);
  };
  const playAudioAndOpenModal = () => {
    if (qualTela === 2){
    carregareTocar(); 
    openModalPlay();
    }else if(qualTela === 3){
    carregareTocar();
    openModalPlay1(); 
    }else if(qualTela === 4){
      carregareTocar();
      openModalPlay2();
    }
};
  const renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => iniciar(item)} underlayColor="grey">
      <View
        style={{
          padding: 20,
          marginBottom: 5,
          borderWidth: 1,
          borderRadius: 10,
          backgroundColor: '#242424',
        }}>
        <View style={{ flex: 2, flexDirection: 'row' }}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderWidth: 1,
              borderColor: 'green',
              borderRadius: 100,
              margin: 5,
            }}
            source={{ uri: item.img }}
          />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontFamily: 'sans-serif',
              }}>
              Músicas
            </Text>
            <Text style={{ color: 'white', textAlign: 'center', padding: 10 }}>
              {item.musica}
            </Text>
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            fontFamily: 'sans-serif',
            fontSize: 20,
            textAlign: 'left',
            padding: 10,
          }}>
          {item.cantor}
        </Text>
      </View>
    </TouchableHighlight>
  );
  return (
    <View style={styles.container}>
      {qualTela === 1 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.nav}>
            <Text style={styles.h1}>MusicApp</Text>
            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
              <Image
                style={{ width: 25, height: 25 }}
                source={require('./assets/icons8-engrenagem-64.png')}
              />
              <Image
                style={{ width: 25, height: 25 }}
                source={require('./assets/icons8-sino-64.png')}
              />
            </View>
          </View>
          <View style={styles.body}>
            <View
              style={{ flex: 0, alignItems: 'baseline', flexDirection: 'row' }}>
              <TouchableHighlight
                style={{
                  borderWidth: 1,
                  padding: 12,
                  margin: 5,
                  borderRadius: 50,
                  backgroundColor: '#242424',
                }}
                onPress={openModal}
                underlayColor="white">
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5 }}
                    source={require('./assets/icons8-lupa-50 (1).png')}
                  />
                  <Text style={{ color: 'white' }}>Cantor</Text>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    backdropBlurRadius={5}>
                    <View>
                      <StatusBar barStyle="dark-content" />
                      {selectSearch == 'cantor' ? (
                        <View style={{ flex: 0, flexDirection: 'row', padding: 8 }}>
                          <TouchableHighlight
                            style={{
                              flex: 0.1,
                              marginTop: 10,
                              marginBottom: 20,
                              padding: 10,
                              borderTopWidth: 1,
                              borderLeftWidth: 1,
                              borderBottomWidth: 1,
                              borderColor: 'white',
                              backgroundColor: '#242424',
                              alignItems: 'center',
                              borderBottomLeftRadius: 5,
                              borderTopLeftRadius: 5,
                            }}
                            onPress={closeModal}>
                            <Image
                              style={{ width: 25, height: 25, borderRadius: 5 }}
                              source={require('./assets/icons8-esquerda-32.png')}
                            />
                          </TouchableHighlight>
                          <TextInput
                            placeholderTextColor="white"
                            placeholder="Informar Cantor.. "
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={{
                              flex: 1,
                              marginTop: 10,
                              marginBottom: 20,
                              padding: 10,
                              borderRightWidth: 1,
                              borderBottomWidth: 1,
                              borderTopWidth: 1,
                              borderColor: 'white',
                              backgroundColor: '#242424',
                              alignItems: 'center',
                              borderTopRightRadius: 5,
                              borderBottomRightRadius: 5,
                              color: 'white',
                            }}
                          />
                        </View>
                      ) : null}

                      {selectSearch == 'musica' ? (
                        <TextInput
                          placeholder="Informar musica.."
                          placeholderTextColor="white"
                          value={searchQueryMusica}
                          onChangeText={setSearchQueryMusica}
                          style={{
                            marginTop: 10,
                            marginBottom: 20,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: 'white',
                            backgroundColor: '#242424',
                          }}
                        />
                      ) : null}
                    </View>
                    <View style={{ flex: 1 }}>
                      {selectSearch == 'cantor' ? (
                        <FlatList
                          data={filteredData}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.cantor}
                        />
                      ) : null}

                      {selectSearch == 'musica' ? (
                        <FlatList
                          data={filteredDataMusica}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.musica}
                        />
                      ) : null}
                    </View>
                  </Modal>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  borderWidth: 1,
                  padding: 12,
                  margin: 5,
                  borderRadius: 50,
                  backgroundColor: '#242424',
                }}
                onPress={openModal2}
                underlayColor="white">
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5 }}
                    source={require('./assets/icons8-lupa-50 (1).png')}
                  />
                  <Text style={{ color: 'white' }}>Música</Text>
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible2}
                    backdropBlurRadius={5}>
                    <View>
                     <StatusBar barStyle="dark-content" />
                      {selectSearch == 'cantor' ? (
                        <View style={{ flex: 0, flexDirection: 'row', padding: 8 }}>
                          <TouchableHighlight
                            style={{
                              flex: 0.1,
                              marginTop: 10,
                              marginBottom: 20,
                              padding: 10,
                              borderTopWidth: 1,
                              borderLeftWidth: 1,
                              borderBottomWidth: 1,
                              borderColor: 'white',
                              backgroundColor: '#242424',
                              alignItems: 'center',
                              borderBottomLeftRadius: 5,
                              borderTopLeftRadius: 5,
                            }}
                            onPress={closeModal2}>
                            <Image
                              style={{ width: 25, height: 25, borderRadius: 5 }}
                              source={require('./assets/icons8-esquerda-32.png')}
                            />
                          </TouchableHighlight>
                          <TextInput
                            placeholderTextColor="white"
                            placeholder="Informar Cantor.. "
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={{
                              flex: 1,
                              marginTop: 10,
                              marginBottom: 20,
                              padding: 10,
                              borderRightWidth: 1,
                              borderBottomWidth: 1,
                              borderTopWidth: 1,
                              borderColor: 'white',
                              backgroundColor: '#242424',
                              alignItems: 'center',
                              borderTopRightRadius: 5,
                              borderBottomRightRadius: 5,
                              color: 'white',
                            }}
                            />
                          </View>
                        ) : null}

                      {selectSearch == 'musica' ? (
                        <View style={{ flex: 0, flexDirection: 'row' , padding: 8,}}>
                          <TouchableHighlight
                            style={{
                              flex: 0.1,
                              marginTop: 10,
                              marginBottom: 20,
                              padding: 10,
                              borderTopWidth: 1,
                              borderLeftWidth: 1,
                              borderBottomWidth: 1,
                              borderColor: 'white',
                              backgroundColor: '#242424',
                              alignItems: 'center',
                              borderTopLeftRadius: 5,
                              borderBottomLeftRadius: 5,
                              color: 'white',
                            }}
                            onPress={closeModal2}>
                            <Image
                              style={{ width: 25, height: 25, borderRadius: 5 }}
                              source={require('./assets/icons8-esquerda-32.png')}
                            />
                          </TouchableHighlight>
                          <TextInput
                            placeholder="Informar musica.."
                            placeholderTextColor="white"
                            value={searchQueryMusica}
                            onChangeText={setSearchQueryMusica}
                            style={{
                              flex: 1,
                              marginTop: 10,
                              marginBottom: 20,
                              padding: 10,
                              borderRightWidth: 1,
                              borderBottomWidth: 1,
                              borderTopWidth: 1,
                              borderColor: 'white',
                              backgroundColor: '#242424',
                              alignItems: 'center',
                              borderTopRightRadius: 5,
                              borderBottomRightRadius: 5,
                            }}
                          />
                        </View>
                      ) : null}
                    </View>
                    <View style={{ flex: 1 }}>
                      {selectSearch == 'cantor' ? (
                        <FlatList
                          data={filteredData}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.cantor}
                        />
                      ) : null}

                      {selectSearch == 'musica' ? (
                        <FlatList
                          data={filteredDataMusica}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.musica}
                        />
                      ) : null}
                    </View>
                  </Modal>
                </View>
              </TouchableHighlight>
            </View>
            <View
              style={{
                flex: 0.8,
                alignItems: 'baseline',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: '#242424',
                  alignItems: 'center',
                }}>
                <View style={{ flex: 0.6, borderRadius: 5 }}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 5 }}
                    source={require('./assets/icons8-coração-64 (1).png')}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white' }}>Favoritas</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: '#242424',
                  alignItems: 'center',
                }} onPress={() => setQualTela(2)}>
                <View style={{ flex: 0.6, borderRadius: 5 }}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 5 }}
                    source={{
                      uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/c/f/1/c/351621400611419.jpg',
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white' }}>MacDeMarco</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{ flex: 1, alignItems: 'baseline', flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: '#242424',
                  alignItems: 'center',
                }} onPress={() => setQualTela(3)}>
                <View style={{ flex: 0.6, borderRadius: 5 }}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 5 }}
                    source={{
                      uri: 'https://i.scdn.co/image/ab6761610000e5eb7674b7357c361781ccbb942f',
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white' }}>Pumapjl</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  margin: 5,
                  borderRadius: 5,
                  backgroundColor: '#242424',
                  alignItems: 'center',
                }} onPress={() => setQualTela(4)}>
                <View style={{ flex: 0.6, borderRadius: 5 }}>
                  <Image
                    style={{ width: 60, height: 60, borderRadius: 5 }}
                    source={{
                      uri: 'https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b',
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'white' }}>Eminem</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.5 }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  fontSize: 25,
                }}>
                Tocados recentemente
              </Text>
            </View>
            <View style={{ flex: 4 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'baseline',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      margin: 5,
                      borderRadius: 5,
                      padding: 5,
                      alignItems: 'center',
                    }} onPress={() => setQualTela(2)}>
                    <Image
                      style={{ width: 200, height: 200, borderRadius: 5 }}
                      source={{
                        uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/c/f/1/c/351621400611419.jpg',
                      }}
                    />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      MacDeMarco
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      margin: 5,
                      borderRadius: 5,
                      padding: 5,
                      alignItems: 'center',
                    }} onPress={() => setQualTela(3)}>
                    <Image
                      style={{ width: 200, height: 200, borderRadius: 5 }}
                      source={{
                        uri: 'https://i.scdn.co/image/ab6761610000e5eb7674b7357c361781ccbb942f',
                      }}
                    />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      Pumapjl
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      margin: 5,
                      borderRadius: 5,
                      padding: 5,
                      alignItems: 'center',
                    }} onPress={() => setQualTela(4)}>
                    <Image
                      style={{ width: 200, height: 200, borderRadius: 5 }}
                      source={{
                        uri: 'https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b',
                      }}
                    />
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>
                      Eminem
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      ) : qualTela === 2 ? (
        <View style={{ flex: 10, backgroundColor: '#121212' }}>
          <TouchableOpacity onPress={voltar}><Image
            style={{ width: 30, height: 30, borderRadius: 5, marginTop: 30, margin: 5,}}
            source={require('./assets/icons8-esquerda-32.png')}
          /></TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 20,
              marginTop: 20,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: 'green',
                borderRadius: 100,
                margin: 5,
              }}
              source={{
                uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/c/f/1/c/351621400611419.jpg',
              }}
            />
            <Text style={styles.h1}>MacDeMarco</Text>
            <TouchableHighlight onPress={playAudioAndOpenModal}>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5, marginBottom: 25, }}
                  source={require('./assets/icons8-reproduzir-50.png')}
                />
              </View>
              <Modal
                animationType="fade"
                transparent={false}
                visible={isModalVisiblePlay}
                backdropBlurRadius={5}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212'}}>
                <View style={{flex: 0.5, backgroundColor: '#242424', padding: 20, borderRadius: 5}}>
                <View>
                <TouchableOpacity onPress={closeModalPlay}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5, margin: 5,}}
                    source={require('./assets/icons8-esquerda-32.png')}
                  />
                </TouchableOpacity>
                </View>
                    <View >
                      <Image
                        style={{
                          width: 300,
                          height: 300,
                          resizeMode: 'cover',
                          borderRadius: 5,

                          margin: 5,
                        }}
                        source={{
                          uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/c/f/1/c/351621400611419.jpg',
                        }}
                      />
                    </View>
                    <View style={{flex: 1 ,padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={pausarAudio}>
                        <Image
                          style={{ width: 40, height: 40, marginTop: 10 ,borderRadius: 5, margin: 5,}}
                          source={require('./assets/icons8-pausa-50 (2).png')}
                          />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#888',
              marginBottom: 10,
            }}></View>
          <View
            style={{
              flex: 4,
              alignItems: 'stretch',
              justifyContent: 'flex-start',
            }}>
            <TouchableHighlight
              style={{ flex: 0.1 }}
              onPress={playAudioAndOpenModal}>
              <View style={{flex: 1}}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={isModalVisiblePlay}
                backdropBlurRadius={5}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212'}}>
                <View style={{flex: 0.55, backgroundColor: '#242424', padding: 20, borderRadius: 5}}>
                <View>
                <TouchableOpacity onPress={closeModalPlay}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5, margin: 5,}}
                    source={require('./assets/icons8-esquerda-32.png')}
                  />
                </TouchableOpacity>
                </View>
                    <View >
                      <Image
                        style={{
                          width: 300,
                          height: 300,
                          resizeMode: 'cover',
                          borderRadius: 5,

                          margin: 5,
                        }}
                        source={{
                          uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/f/2/8/b/574461492692160.jpg',
                        }}
                      />
                    </View>
                    <View style={{flex: 1 ,padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={pausarAudio}>
                        <Image
                          style={{ width: 40, height: 40, marginTop: 10 ,borderRadius: 5, margin: 5,}}
                          source={require('./assets/icons8-pausa-50 (2).png')}
                          />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={{
                    uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/f/2/8/b/574461492692160.jpg',
                  }}
                />
                <Text
                  style={{ color: 'white', fontWeight: 'bold', padding: 3 }}>
                  For the First Time
                </Text>
              </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      ) : qualTela === 3 ? (
         <View style={{ flex: 10, backgroundColor: '#121212' }}>
          <TouchableOpacity onPress={voltar}><Image
            style={{ width: 30, height: 30, borderRadius: 5, marginTop: 30, margin: 5,}}
            source={require('./assets/icons8-esquerda-32.png')}
          /></TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 20,
              marginTop: 20,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: 'green',
                borderRadius: 100,
                margin: 5,
              }}
              source={{
                uri: 'https://i.scdn.co/image/ab6761610000e5eb7674b7357c361781ccbb942f',
              }}
            />
            <Text style={styles.h1}>Pumapjl</Text>
            <TouchableHighlight onPress={playAudioAndOpenModal}>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5, marginBottom: 25, }}
                  source={require('./assets/icons8-reproduzir-50.png')}
                />
              </View>
              <Modal
                animationType="fade"
                transparent={false}
                visible={isModalVisiblePlay1}
                backdropBlurRadius={5}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212'}}>
                <View style={{flex: 0.55, backgroundColor: '#242424', padding: 20, borderRadius: 5}}>
                <View>
                <TouchableOpacity onPress={closeModalPlay1}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5, margin: 5,}}
                    source={require('./assets/icons8-esquerda-32.png')}
                  />
                </TouchableOpacity>
                </View>
                    <View >
                      <Image
                        style={{
                          width: 300,
                          height: 300,
                          resizeMode: 'cover',
                          borderRadius: 5,

                          margin: 5,
                        }}
                        source={{
                          uri: 'https://i1.sndcdn.com/artworks-lDJjuPXFTEyyD94k-pcaxEQ-t500x500.jpg',
                        }}
                      />
                    </View>
                    <View style={{flex: 1 ,padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={pausarAudio}>
                        <Image
                          style={{ width: 40, height: 40, marginTop: 10 ,borderRadius: 5, margin: 5,}}
                          source={require('./assets/icons8-pausa-50 (2).png')}
                          />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#888',
              marginBottom: 10,
            }}></View>
          <View
            style={{
              flex: 4,
              alignItems: 'stretch',
              justifyContent: 'flex-start',
            }}>
            <TouchableHighlight
              style={{ flex: 0.1 }}
              onPress={playAudioAndOpenModal}>
              <View style={{flex: 1}}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={isModalVisiblePlay}
                backdropBlurRadius={5}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212'}}>
                <View style={{flex: 0.55, backgroundColor: '#242424', padding: 20, borderRadius: 5}}>
                <View>
                <TouchableOpacity onPress={closeModalPlay}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5, margin: 5,}}
                    source={require('./assets/icons8-esquerda-32.png')}
                  />
                </TouchableOpacity>
                </View>
                    <View >
                      <Image
                        style={{
                          width: 300,
                          height: 300,
                          resizeMode: 'cover',
                          borderRadius: 5,

                          margin: 5,
                        }}
                        source={{
                          uri: 'https://akamai.sscdn.co/uploadfile/letras/albuns/c/f/1/c/351621400611419.jpg',
                        }}
                      />
                    </View>
                    <View style={{flex: 1 ,padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={pausarAudio}>
                        <Image
                          style={{ width: 40, height: 40, marginTop: 10 ,borderRadius: 5, margin: 5,}}
                          source={require('./assets/icons8-pausa-50 (2).png')}
                          />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={{
                    uri: 'https://i1.sndcdn.com/artworks-lDJjuPXFTEyyD94k-pcaxEQ-t500x500.jpg',
                  }}
                />
                <Text
                  style={{ color: 'white', fontWeight: 'bold', padding: 3 }}>
                  Intro
                </Text>
              </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      ) : qualTela === 4 ?(
         <View style={{ flex: 10, backgroundColor: '#121212' }}>
          <TouchableOpacity onPress={voltar}><Image
            style={{ width: 30, height: 30, borderRadius: 5, marginTop: 30, margin: 5,}}
            source={require('./assets/icons8-esquerda-32.png')}
          /></TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              padding: 20,
              marginTop: 20,
            }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderColor: 'green',
                borderRadius: 100,
                margin: 5,
              }}
              source={{
                uri: 'https://i.scdn.co/image/ab6761610000e5eba00b11c129b27a88fc72f36b',
              }}
            />
            <Text style={styles.h1}>Pumapjl</Text>
            <TouchableHighlight onPress={playAudioAndOpenModal}>
            <View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5, marginBottom: 25, }}
                  source={require('./assets/icons8-reproduzir-50.png')}
                />
              </View>
              <Modal
                animationType="fade"
                transparent={false}
                visible={isModalVisiblePlay2}
                backdropBlurRadius={5}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212'}}>
                <View style={{flex: 0.5, backgroundColor: '#242424', padding: 20, borderRadius: 5}}>
                <View>
                <TouchableOpacity onPress={closeModalPlay2}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5, margin: 5,}}
                    source={require('./assets/icons8-esquerda-32.png')}
                  />
                </TouchableOpacity>
                </View>
                    <View >
                      <Image
                        style={{
                          width: 300,
                          height: 300,
                          resizeMode: 'cover',
                          borderRadius: 5,

                          margin: 5,
                        }}
                        source={{
                          uri: 'https://i.scdn.co/image/ab67706c0000da8488d9b9fe27dd05177f820bfe',
                        }}
                      />
                    </View>
                    <View style={{flex: 1 ,padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={pausarAudio}>
                        <Image
                          style={{ width: 40, height: 40, marginTop: 10 ,borderRadius: 5, margin: 5,}}
                          source={require('./assets/icons8-pausa-50 (2).png')}
                          />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            </TouchableHighlight>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: '#888',
              marginBottom: 10,
            }}></View>
          <View
            style={{
              flex: 4,
              alignItems: 'stretch',
              justifyContent: 'flex-start',
            }}>
            <TouchableHighlight
              style={{ flex: 0.1 }}
              onPress={playAudioAndOpenModal}>
              <View style={{flex: 1}}>
              <Modal
                animationType="fade"
                transparent={false}
                visible={isModalVisiblePlay2}
                backdropBlurRadius={5}>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212'}}>
                <View style={{flex: 0.5, backgroundColor: '#242424', padding: 20, borderRadius: 5}}>
                <View>
                <TouchableOpacity onPress={closeModalPlay2}>
                  <Image
                    style={{ width: 30, height: 30, borderRadius: 5, margin: 5,}}
                    source={require('./assets/icons8-esquerda-32.png')}
                  />
                </TouchableOpacity>
                </View>
                    <View >
                      <Image
                        style={{
                          width: 300,
                          height: 300,
                          resizeMode: 'cover',
                          borderRadius: 5,

                          margin: 5,
                        }}
                        source={{
                          uri: 'https://i.scdn.co/image/ab67706c0000da8488d9b9fe27dd05177f820bfe',
                        }}
                      />
                    </View>
                    <View style={{flex: 1 ,padding: 5, justifyContent: 'center', alignItems: 'center'}}>
                      <TouchableOpacity onPress={pausarAudio}>
                        <Image
                          style={{ width: 40, height: 40, marginTop: 10 ,borderRadius: 5, margin: 5,}}
                          source={require('./assets/icons8-pausa-50 (2).png')}
                          />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              <View
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  style={{ width: 60, height: 60, borderRadius: 5 }}
                  source={{
                    uri: 'https://i.scdn.co/image/ab67706c0000da8488d9b9fe27dd05177f820bfe',
                  }}
                />
                <Text
                  style={{ color: 'white', fontWeight: 'bold', padding: 3 }}>
                  SuperMan
                </Text>
              </View>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      ):null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingTop: 60,
    padding: 15,
    backgroundColor: '#121212',
    // backgroundColor: '#242424',
  },
  h1: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 20,
  },
  body: {
    flex: 8,
    backgroundColor: '#121212',
  },
});
export default App;
