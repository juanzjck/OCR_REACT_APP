import React, {useState} from 'react';
import {Button, StyleSheet, Text, View, Image, FlatList} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from 'react-native-tesseract-ocr';
import Modal from 'react-native-modal';
import axios from 'axios';
//AIzaSyDfAIHOEHQ0XMVjsYQePcQxrLvxS1bvAEk
//https://www.googleapis.com/customsearch/v1?cx=010987047032419380671%3Azu3fnejdxjy&key=AIzaSyCVm0yQPFxy4UK4gzhlC52EWj_PiHTW1RU&q=

const DEFAULT_HEIGHT = 500;
const DEFAULT_WITH = 600;
const defaultPickerOptions = {
  cropping: true,
  height: DEFAULT_HEIGHT,
  width: DEFAULT_WITH,
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [DATA, setDATA] = useState({data:undefined});
  
  const [imgSrc, setImgSrc] = useState(null);
  const [text, setText] = useState('');
  useEventListener('onProgressChange', (p) => {
    setProgress(p.percent / 100);
  });

  const recognizeTextFromImage = async (path) => {
    setIsLoading(true);

    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        LANG_ENGLISH,
        tesseractOptions,
      );
      setText(recognizedText);
    } catch (err) {
      console.error(err);
      setText('');
    }

    setIsLoading(false);
    setProgress(0);
  };

  const recognizeFromPicker = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openPicker(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const recognizeFromCamera = async (options = defaultPickerOptions) => {
    try {
      const image = await ImagePicker.openCamera(options);
      setImgSrc({uri: image.path});
      await recognizeTextFromImage(image.path);
    } catch (err) {
      if (err.message !== 'User cancelled image selection') {
        console.error(err);
      }
    }
  };

  const searchGoogle=(text)=>{
    var sin_salto = text.split("\n").join("");
    const texts=sin_salto.split(' ');
    let textToSearch='';
    let i=0;
    texts.map((txt)=>{
      if(i=0)textToSearch+=`${txt}`;
      else textToSearch+=`+${txt}`;
      i++;
    })
    console.log(textToSearch)
    axios.get(
      'https://www.googleapis.com/customsearch/v1?cx=010987047032419380671%3Azu3fnejdxjy&key=AIzaSyCVm0yQPFxy4UK4gzhlC52EWj_PiHTW1RU&q=' +
        `${textToSearch}` +
        '&start=1'
    )
    .then(response =>{
      setDATA({ data: response.data.items })
      console.log( response.data.items)
      setopenModal(true);
    }
    );
    

  }
  const Item = (item) =>{ 
    console.log(item)
    return(
    
    <View style={styles.item}>
       <Text style={styles.title}>Resultado</Text>
      <Text style={styles.title}>{item.item.title}</Text>
      <Text style={styles.title}>{item.item.displayLink}</Text>
    </View>
  );}
  
  return (
    <View style={styles.container}>
       <Modal isVisible={openModal}>
        <View  style={styles.containerBackGround}>
        <Button
            disabled={isLoading}
            title="SALIR"
            onPress={() => {
              setopenModal(false);
            }}
          />
          <Text>Resultados</Text>
            <FlatList
            data={DATA.data}
            renderItem={Item}
            keyExtractor={item => item.id}
          />
          
        </View>
      </Modal>
      <Text style={styles.title}>Guillermo Torres</Text>
      <Text style={styles.instructions}>Toma una foto:</Text>
      <View style={styles.options}>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Camera"
            onPress={() => {
              recognizeFromCamera();
            }}
          />
        </View>
        <View style={styles.button}>
          <Button
            disabled={isLoading}
            title="Picker"
            onPress={() => {
              recognizeFromPicker();
            }}
          />
        </View>
      </View>
      {imgSrc && (
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imgSrc} />
          {isLoading ? (
            <Text>Cargando...</Text>
          ) : (
            <>
                 <Text>{text}</Text>
                <Button
                disabled={isLoading}
                title="Buscar en google"
                onPress={() => {
                  searchGoogle(text);
                }}
              />
            </>
       
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    marginHorizontal: 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 15,
    height: DEFAULT_HEIGHT / 2.5,
    width: DEFAULT_WITH / 2.5,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  containerBackGround:{
    backgroundColor:'white',
    height:'100%',
    width:'100%'
  },
  title:{
    color:'white',
    fontSize:10
  }
});

export default App;