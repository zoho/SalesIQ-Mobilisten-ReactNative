import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerTopSpacing: {
    paddingTop: 10,
    paddingHorizontal: 15
  },
  containerBottomSpacing: {
    marginBottom:100
  },
  logoContainer: {
    marginTop: 25, 
    alignItems: 'center'
  },
  salesiqLogo: { 
    width: 75,
    height: 75,
  },
  visitorInfoTitle:{
    fontSize: 16,
    color: '#191919'
    paddingTop: 5,
    paddingRight: 5
  },
  visitorInfoContainer: {
    marginTop: 5,
    flexDirection:'row',
    alignItems: "center",
    justifyContent: 'space-between',
  },
  visitorInfoInputsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  visitorInfoComponent: {
    flex: 1,
    marginLeft: 10,
  },
  chatIdInputContainer: {
    borderColor: '#D9D9D9',
    borderRadius: 5,
    marginTop: 5,
  },
  spaceBetweenButtonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20,
  },
  spaceBetweenSingleButtonContainer:
  {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical:10,
  },
  spaceBetweenSingleRightButtonContainer:
  {
    marginLeft:10
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
    paddingVertical:10,
    paddingHorizontal:24,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0.9
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 15,
    marginHorizontal: 15,
    paddingVertical:10,
    paddingHorizontal:24,
    borderColor: '#007AFF',
    borderWidth: 1.2,
  },
  outlinedButtonText: {
    color: '#007AFF',
    fontSize: 14,
    letterSpacing: 0.7,
    fontWeight: '600'
  },
  attenderImageContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',   
  },
  attenderIdInputStyle: {
    flex: 1,
    fontSize: 16,
    height: 60,      
    paddingHorizontal:10,
  },
  attenderIdDoneIconPaddedContent: {
    padding: 10
  },
  attenderDefaultImageStyle: {
    height: 50,
    width: 50,
    marginLeft: 10,
    marginTop: 10,
  },
  attenderProfileImageStyle: {
    borderRadius: 25, 
  },
  attenderIdDoneIconStyle: {
    height: 24,
    width: 24,
  },
  horizontalLine:{
    height: 1.2,
    backgroundColor: '#EFEFEF',
    marginTop: 20,
  },
  dropdownBox: {
    marginTop: 20,
    borderColor: "#D9D9D9",
    height: 60,
    borderRadius: 6,
  },
  dropdownListItemLabelStyle: {
    color: "#191919",
  },
  dropdownListItemContainerStyle: {
    height: 45
  },
  dropDownContainerStyle: {
    marginTop: 20,
    borderColor: "#D9D9D9",
  },
  dropdownPlaceholderStyle:
  {
    color: "#4D4D4D",
  },
  dropdownTextStyle: {
    fontSize: 16
  },
  launcherVisibilityContainer: {
    marginTop: 15,
    flexDirection:'row',
    alignItems: "center",
    justifyContent: 'space-between', 
  },
  launcherVisibilityTitle:{
    fontSize: 16,
    color: '#191919'
  },
  launcherVisibilityTabsContainerStyle: {
    backgroundColor: 'transparent',
    flexDirection:'row',
  },
  launcherVisibilityTabStyle: {
    flex: 0, 
    paddingVertical: 5,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  launcherVisibilityTabTextStyle: {
    fontSize: 14,
    color: '#4D4D4D'
  },
  launcherVisibilityActiveTabStyle: {
    backgroundColor: '#007AFF',
  },
  launcherVisibilityActiveTabTextStyle: {
    color: 'white'
  },
  registeredUserComponentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registeredUserComponentInputContainer: {
    borderColor: '#D9D9D9',
    borderRadius: 5,
    width: '100%',
  },
  registeredUserComponentCharacterCounter: {
    marginTop: 5,
    marginHorizontal: 5,
    fontSize: 12,
    color: '#4D4D4D',
    alignSelf: 'flex-end',
  },
  loginButtonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 5,
  },
  setLanguageTitle:{
    fontSize: 16,
    color: '#191919'
  },
  languageContainer: {
      marginTop: 15,
      flex: 1,
      flexDirection:'row',
      alignItems: "center",
      justifyContent: 'space-between',
  },
  languageOptionsContainer: {
      flexDirection:'row',
      alignItems: "center",
  },
  languageButton: {
      fontSize: 16,
      textDecorationLine: 'underline',
      color: 'darkgrey',
      paddingLeft: 10
  },
  selectedLanguageButton: {
      color: '#007AFF',
  },
  languageContainerVerticalDivider: {
      fontSize: 22,
      paddingLeft: 10,
      color: '#D9D9D9'
  }
});
