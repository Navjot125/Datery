import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native'

const CommonList = ({ data, renderItem, onScroll, onScrollEndDrag }) => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item) => item._id}
                horizontal
                contentContainerStyle={{ flexDirection: "row", flexGrow: 1, }}
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                bounces={false}
                alwaysBounceVertical={false}
                overScrollMode="never"
                onScroll={onScroll}
                onScrollEndDrag={onScrollEndDrag}
            />
        </View>
    )
}

export default CommonList