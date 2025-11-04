class SalesIQCallsHelper {
    // static object to maintain call status view mode
    static callStatusViewMode: 'floating' | 'banner' = 'floating';

    static setCallStatusViewMode(mode: 'floating' | 'banner') {
        this.callStatusViewMode = mode;
    }

    static getCallStatusViewMode(): 'floating' | 'banner' {
        return this.callStatusViewMode;
    }
}

export default SalesIQCallsHelper;
