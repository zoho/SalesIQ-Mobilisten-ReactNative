import { Platform, requireNativeComponent, StyleProp, StyleSheet, ViewStyle } from "react-native";
import React, { useEffect, useMemo, useState } from 'react';
import { ZSIQCallsWrapper as ZohoSalesIQCalls } from "./components";
import { ListenerEvent } from "./types/Listener";
import { isCallActive, SalesIQCallState } from "./components/core/SalesIQCall";
import { SalesIQCallsHelper } from "@react-native-zohosalesiq/mobilisten-core";

export { ZSIQCallsWrapper as ZohoSalesIQCalls } from "./components";
export { CallComponent, SalesIQCallState } from "./components/core/SalesIQCall";
export { ListenerEvent as SalesIQCallEvent } from "./types/Listener";

interface SalesIQAndroidCallStatusBarViewProps {
    isDarkMode: boolean,
    style?: StyleProp<ViewStyle>,
    children?: React.ReactNode
}

const SalesIQAndroidCallStatusBarRawView = requireNativeComponent<SalesIQAndroidCallStatusBarViewProps>('SalesIQAndroidCallStatusBarView');

const SalesIQAndroidCallStatusBarView: React.FC<SalesIQAndroidCallStatusBarViewProps> = ({ style, ...props }) => {

    const [callState, setCallState] = useState<SalesIQCallState | null>(null);

    const activeCallStyles = StyleSheet.create({
        customView: {
            width: 'auto',
            height: 28
        },
    });

    let isStatusViewInBannerMode = SalesIQCallsHelper.getCallStatusViewMode() === 'banner';

    useEffect(() => {
        if (Platform.OS == 'ios') {
            return
        }
        ZohoSalesIQCalls.getCurrentCallState().then((state) => {
            setCallState(state);
        }).catch((error) => {
            console.error('Error fetching current call state:', error);
        });

        const subscription = ZohoSalesIQCalls.addListener(async (payload) => {
            if (payload.event == ListenerEvent.STATE_CHANGED) {
                const currentState = await ZohoSalesIQCalls.getCurrentCallState();
                setCallState(currentState);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [props.isDarkMode]);

    if (!isCallActive(callState?.status) || !isStatusViewInBannerMode) {
        return null;
    }

    return Platform.OS == 'ios' ? <></> : <SalesIQAndroidCallStatusBarRawView {...props} style={[activeCallStyles.customView, style]} />;
};

export { SalesIQAndroidCallStatusBarView };