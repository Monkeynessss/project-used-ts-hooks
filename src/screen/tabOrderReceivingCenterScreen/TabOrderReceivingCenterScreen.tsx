import React, {createRef} from "react";
import {
    FlatList,
    Image,
    ImageSourcePropType,
    ImageStyle,
    ListRenderItem,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import styles from "./TabOrderReceivingCenterScreen.styles";
import {bg_order_receiving_center, icon_frown, icon_right_arrow, img_invited} from "../../file/image/Images";
import {defaultOrderType, localOrderReceivingCenterData, OrderData} from "../../dataBean/OrderData";
import OrderReceivingCenterModal from "../../view/orderReceivingCenterImageModal/OrderReceivingCenterModal";
import Modal from "react-native-modalbox";
import {WINDOW_WIDTH} from "../../tools/WindowTools";

function TabOrderReceivingCenterScreen() {


    const renderFilter = (icon: ImageSourcePropType, text: string, iconStyle: ImageStyle = {}, leftIcon: boolean = false) => {
        return (

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.filter_btn}>
                {leftIcon && <Image source={icon} style={[styles.location_icon, iconStyle]} resizeMode={'contain'}/>}
                <Text style={styles.location_text}>{text}</Text>
                {!leftIcon && <Image source={icon} style={[styles.location_icon, iconStyle]} resizeMode={'contain'}/>}
            </TouchableOpacity>

        )
    }

    const renderItem: ListRenderItem<OrderData> = ({item, index}) => {

        const renderDescription = (key: string, value: string) => {
            return (
                <View style={styles.description_box}>
                    <Text style={styles.description_key}>{key}</Text>
                    <Text style={styles.description_value}>{value}</Text>
                </View>
            )
        }

        const renderBtn = () => {
            let operationBtnStyle;
            let operationBtnTextStyle;
            let operationBtnText;
            switch (item.defaultOrderType) {
                case defaultOrderType.default:
                    operationBtnStyle = styles.btn_operation_default;
                    operationBtnTextStyle = styles.btn_operation_text_default;
                    operationBtnText = '????????????';
                    break;
                case defaultOrderType.overOffer:
                    operationBtnStyle = styles.btn_operation;
                    operationBtnTextStyle = styles.btn_operation_text;
                    operationBtnText = '?????????';
                    break;
                case defaultOrderType.end:
                    operationBtnStyle = styles.btn_operation;
                    operationBtnTextStyle = styles.btn_operation_text;
                    operationBtnText = '?????????';
                    break;
            }
            return (
                <View style={styles.btn_box}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.btn_view_image}>
                        <Text style={styles.btn_view_image_text}>{'????????????'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={operationBtnStyle}>
                        <Text style={operationBtnTextStyle}>{operationBtnText}</Text>
                    </TouchableOpacity>
                </View>
            )
        }

        return (
            <View
                key={index}
                style={styles.item_box}>
                <View style={styles.title_box}>
                    <Text style={styles.title}>{'????????????'}</Text>
                </View>
                <View style={styles.service_content_and_pay_money}>
                    <View style={styles.service_content_box}>
                        {
                            item.orderContent?.map((item, index) => {
                                return (
                                    <View style={styles.service_content}>
                                        <Text style={styles.service_content_text}>{item}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>
                {renderDescription('????????????', item.serviceStartTime)}
                {renderDescription('????????????', item.serviceAddress)}
                {renderBtn()}
            </View>
        )
    }

    const ItemSeparatorComponent = () => {
        return <View style={styles.separator}/>
    }


    const refObject = createRef<Modal>();

    return (
        <View style={styles.container}>
            <Image source={bg_order_receiving_center} style={styles.banner} resizeMode={'cover'}/>
            <View style={styles.filter_box}>
                {renderFilter(icon_frown, '?????????', undefined, true)}
                {renderFilter(icon_right_arrow, '??????', {transform: [{rotateZ: '90deg'}]})}
                {renderFilter(icon_right_arrow, '????????????', {transform: [{rotateZ: '90deg'}]})}
            </View>
            <View style={{width: WINDOW_WIDTH, alignItems: 'center', flex: 1, overflow: 'hidden'}}>
                <OrderReceivingCenterModal ref={refObject}/>
                <FlatList<OrderData>
                    data={localOrderReceivingCenterData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.id}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    refObject.current?.open()
                }}
                style={styles.btn_invited}
                activeOpacity={0.5}>
                <Image source={img_invited} style={styles.img_invited} resizeMode={'contain'}/>
            </TouchableOpacity>
        </View>
    )
}

export default TabOrderReceivingCenterScreen;
