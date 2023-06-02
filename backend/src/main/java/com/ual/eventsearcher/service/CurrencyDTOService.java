package com.ual.eventsearcher.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.ual.eventsearcher.dto.CurrencyDTO;

@Component("currencyDTOService")
public class CurrencyDTOService {

    public CurrencyDTO retrieveCurrency() {
        
        HashMap<String, Double> currency = new HashMap<String, Double>();

        try {
            Document webPage = Jsoup.connect("https://www.x-rates.com/table/?from=USD&amount=1").get();
            Element tbody = webPage.getElementsByClass("tablesorter ratesTable").first().getElementsByTag("tbody").get(0);

            List<Element> rows = tbody.children();

            for (Element row : rows) { 

              
                Elements tds = row.getElementsByTag("td");

                String currencyName = tds.get(0).text();   
                Double currencyValue = toDoubleOrNull(tds.get(1).text());            

                currency.put(currencyName, currencyValue);
            }

            return new CurrencyDTO(currency);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
    
    private Double toDoubleOrNull(String replace) {
        try {
            return Double.parseDouble(replace);
        } catch (NumberFormatException e) {
            return null;
        }
    }

   
    
}
