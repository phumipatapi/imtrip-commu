import React, {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { authen, db } from "../../firebase_config";

import { Bubble, GiftedChat, IMessage } from "react-native-gifted-chat";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Colors from "../../constants/Colors";

interface Props {
  navigation: any;
  route: any;
}

const Chat = (props: Props) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [userName, setUserName] = React.useState<string>("");

  const { chat_user, chat_user_id } = props.route.params;



  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
            }}
            source={{ uri: authen?.currentUser?.photoURL! }}
          />
          {/* <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} /> */}
        </View>
      ),
    });

    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, [
    props.navigation,
  ]);

  React.useEffect(() => {
    // Fetch the user list from the Firestore "users" collection
    async function fetchUserList() {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);
      const usersList = usersSnapshot.docs.map((doc) => doc.data());
      setUserName(usersList[0].name);
    }

    fetchUserList();
  }, []);
  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    const chatUserId = chat_user_id; // ID of the chat user

    addDoc(collection(db, "chats"), { _id, createdAt, text, user, chatUserId });
  }, []);
  return (
    <GiftedChat
      messages={
        messages.filter(
          (message) =>
            message.user._id === authen?.currentUser?.uid ||
            message.user._id === chat_user_id

        )
      }
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: authen?.currentUser?.uid!,
        name: authen?.currentUser?.displayName!,
        avatar: authen?.currentUser?.photoURL!,
      }}

      renderBubble={
        (props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                right: {
                  backgroundColor: Colors.light.button,
                },
                left: {
                  backgroundColor: Colors.light.grey,
                },
              }}
              textStyle={{
                right: {
                  color: "#fff",
                },
                left: {
                  color: "#000",
                },
              }}
            />
          );
        }
      }
    />
  );
};

export default Chat;
