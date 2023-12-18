// import React from 'react';
// import { View, Text,} from 'react-native';
// import styles from './NotificationDeleteModalStyle';
// import Modal from 'react-native-modal';
// import * as Atoms from '../../atoms';

// export const EnrollModal = (props) => {
// 	const [modalVisible, setModalVisible] = React.useState(false);

// 	const { isVisible, onRequestClose, onRef, OnDelete, OnCancel, } = props;

// 	React.useEffect(() => {
// 		setModalVisible(isVisible)

// 	}, [isVisible]);

// 	return (
// 		<View>
// 			<Modal
// 				// isVisible={true}
// 				ref={onRef != undefined ? onRef : null}
// 				isVisible={modalVisible}
// 				onBackButtonPress={() => { onRequestClose(); }}
// 				onBackdropPress={() => { onRequestClose(); }}
// 				animationIn="zoomIn"
// 				animationOut="zoomOut"
// 				style={{ justifyContent: 'center', alignItems: 'center' }}>
// 				<View style={styles.flex}>
// 					<View style={styles.container}  >
// 						<Text style={styles.titileTxt}  >{'Notification Delete'}</Text>
// 						<Text style={styles.descriptionTxt} >{'You Have Selected to Delete This Notification?'}</Text>
// 					</View>
// 					<View style={styles.btnBox} >
// 						<Atoms.Button title={'Cancel'} style={styles.button1} textStyle={styles.butTxt1} onPress={() => { OnCancel() }} />
// 						<Atoms.Button title={'Delete'} style={styles.button} textStyle={styles.butTxt} onPress={() => { OnDelete() }} />
// 					</View>
// 				</View>
// 			</Modal>
// 		</View >
// 	);
// }

// export default EnrollModal;
