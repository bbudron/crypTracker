import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'
import FetchCoinData from './../Actions/FetchCoinData'
import CoinCard from './CoinCard'

class CryptoContainer extends Component {
    componentDidMount() {
        this.props.FetchCoinData()
    }

    renderCoinCards() {
        const {crypto} = this.props
        return crypto.data.map((coin) =>
            <CoinCard
                key={coin.name}
                coinName={coin.name}
                symbol={coin.symbol}
                priceUSD={coin.priceUSD}
                percentChange24hr={coin.percentChange24hr}
                percentChange7d={coin.percentChange7d}
            />
        )
    }

    render() {
        const {crypto} = this.props
        const {contentContainer} = styles

        if (crypto.isFetching) {
            return(
                <View>
                    <Spinner
                        visible={crypto.isFetching}
                        textContent={'Loading...'}
                        textStyle={{color: "#253145"}}
                        animation='fade'
                    />
                </View>
            )
        } else {
            return(
                <ScrollView contentContainerStyle={contentContainer}>
                    {this.renderCoinCards()}
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 100,
        paddingTop: 55
    },
})

function mapStateToProps(state) {
    return {
        crypto: state.crypto
    }
}

export default connect(mapStateToProps, {FetchCoinData})(CryptoContainer)