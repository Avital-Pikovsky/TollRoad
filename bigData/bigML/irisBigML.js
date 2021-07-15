/**
*  Predictor for variety from model/60f03dfcc5f95309200ab7d2
*  Predictive model by BigML - Machine Learning Made Easy
*/
function predictVariety(sepalWidth, petalLength, petalWidth) {
    if (petalLength == null) {
        return "Setosa";
    }
    else if (petalLength > 2.45) {
        if (petalWidth == null) {
            return "Versicolor";
        }
        else if (petalWidth > 1.75) {
            if (petalLength > 4.85) {
                return "Virginica";
            }
            else if (petalLength <= 4.85) {
                if (sepalWidth == null) {
                    return "Virginica";
                }
                else if (sepalWidth > 3.1) {
                    return "Versicolor";
                }
                else if (sepalWidth <= 3.1) {
                    return "Virginica";
                }
            }
        }
        else if (petalWidth <= 1.75) {
            if (petalLength > 4.95) {
                if (petalWidth > 1.55) {
                    if (petalLength > 5.45) {
                        return "Virginica";
                    }
                    else if (petalLength <= 5.45) {
                        return "Versicolor";
                    }
                }
                else if (petalWidth <= 1.55) {
                    return "Virginica";
                }
            }
            else if (petalLength <= 4.95) {
                if (petalWidth > 1.65) {
                    return "Virginica";
                }
                else if (petalWidth <= 1.65) {
                    return "Versicolor";
                }
            }
        }
    }
    else if (petalLength <= 2.45) {
        return "Setosa";
    }
    return null;
}