public class Scheduler {

    public static String[] addX(int n, String arr[], String x) {
        int i;
  
        // create a new array of size n+1
        String newarr[] = new String[n + 1];
  
        // insert the elements from
        // the old array into the new array
        // insert all elements till n
        // then insert x at n+1
        for (i = 0; i < n; i++)
            newarr[i] = arr[i];
  
        newarr[n] = x;
  
        return newarr;
    }

    public static String removeLastChar(String s)   
    {  
        //returns the string after removing the last character  
        return s.substring(0, s.length() - 1);  
    }   

    public static String[] append(String[] arr, String x) {
        return addX(arr.length, arr, x);
    }

    public static boolean[] getIntersection(boolean[][] schedules) {
        boolean[] intersection = new boolean[60 * 24];
        for (int i = 0; i < intersection.length; i++) {
            intersection[i] = true;
        }

        for (int i = 0; i < intersection.length; i++) {
            for (boolean[] schedule : schedules) {
                intersection[i] = intersection[i] && schedule[i];
            }
        }

        return intersection;
    }

    public static String streak(boolean arr[]) {
        String[] streaks;

        for(int i=0;i<arr.length;i++){
            if(arr[i]==true){
                for(int j=i+1; j< arr.length;j++){
                    if(arr[j]==false) {
                        if(i!=j-1)
                            streaks = append(streaks, (""+i+"-"+(j-1)+", "));
                        else
                            streaks = append(streaks, (""+(j-1)+", "));
                        i=j;
                        break;
                    }
                }
            }
        }

        String json = "";
        for (String streak : streaks) {
            json += streak + ",";
        }
        json = removeLastChar(json);
        json = "[" + json + "]";
        return json;
    }
    
}