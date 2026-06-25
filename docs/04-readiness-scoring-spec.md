# SECTION 4 --- READINESS SCORING SPECIFICATION**

**4.1 Overview**

The scoring engine evaluates 13 DevOps categories. Each category has a
weight, a set of questions, and per-answer score deductions. The total
score is a weighted average across all categories, normalised to 0--100.
Higher is better. The model is intentionally conservative: most
real-world AI-generated apps score between 20 and 55 on first attempt.

**4.2 Category Weights and Score Bands**

  -------- -------------------- ------------ -------- ------------- --------------- -----------
  **\#**   **Category**         **Weight**   **Max    **Critical    **Questions**   **Upsell
                                             Pts**    Threshold**                   Trigger**

  1        CI/CD Pipeline       10%          10       \< 4          4               \< 5 pts →
                                                                                    Launch Fix

  2        Secrets Management   12%          12       \< 4          4               \< 6 pts →
                                                                                    Audit

  3        Environment          8%           8        \< 3          3               \< 4 pts →
           Variables                                                                Audit

  4        Container/Docker     7%           7        \< 2          3               \< 4 pts →
           Readiness                                                                Setup

  5        Deployment Setup     10%          10       \< 4          4               \< 5 pts →
                                                                                    Launch Fix

  6        Monitoring & Logging 10%          10       \< 3          4               \< 5 pts →
                                                                                    Care Plan

  7        Backup & Recovery    10%          10       \< 3          3               \< 5 pts →
                                                                                    Launch Fix

  8        Staging/Production   8%           8        \< 3          3               \< 4 pts →
           Separation                                                               Setup

  9        Documentation        5%           5        \< 2          3               \< 3 pts →
                                                                                    Audit

  10       Security Basics      10%          10       \< 4          4               \< 6 pts →
                                                                                    Audit

  11       Error Handling       5%           5        \< 2          3               \< 3 pts →
                                                                                    Launch Fix

  12       Domain & SSL         5%           5        \< 2          2               \< 3 pts →
           Readiness                                                                Launch Fix

  13       Database Production  10%          10       \< 4          4               \< 5 pts →
           Readiness                                                                Setup
  -------- -------------------- ------------ -------- ------------- --------------- -----------

**4.3 Category 1 --- CI/CD Pipeline (Weight 10%)**

  ----------------------- -------------------- ------------------- -------------
  **Question**            **Answer Options**   **Score**           **Risk if
                                                                   No/None**

  Do you have any         Yes / No             Yes=3, No=0         CRITICAL
  automated build                                                  
  process?                                                         

  Where does your CI/CD   GitHub Actions /     Actions/GitLab=3,   CRITICAL
  run?                    GitLab CI / None /   Other=2, None=0     
                          Other                                    

  Are tests run on every  Yes / No / No tests  Yes=2, No=1, None=0 HIGH
  pull request?                                                    

  Do failed builds block  Yes / No             Yes=2, No=0         HIGH
  deployment?                                                      
  ----------------------- -------------------- ------------------- -------------

- Recommendation (score \< 5): \"You have no automated deployment safety
  net. A single bad commit will break production with no rollback path.
  We recommend implementing GitHub Actions CI/CD as part of the Launch
  Fix package.\"

- Upsell: £500 Production Launch Fix

**4.4 Category 2 --- Secrets Management (Weight 12%)**

  ----------------------- -------------------- ----------- -------------
  **Question**            **Answer Options**   **Score**   **Risk if
                                                           No/None**

  Are any API keys or     Yes / No / Not Sure  No=4, Not   CRITICAL
  passwords in your                            Sure=1,     
  GitHub repo?                                 Yes=0       

  Do you use environment  Yes / No / Some      Yes=3,      CRITICAL
  variables for all                            Some=2,     
  secrets?                                     No=0        

  Does your hosting       Yes / No / Don\'t    Yes=3,      HIGH
  platform store secrets  Know                 Don\'t      
  securely?                                    Know=1,     
                                               No=0        

  Have you rotated keys   Yes / No             Yes=2, No=0 MEDIUM
  since initial setup?                                     
  ----------------------- -------------------- ----------- -------------

- Recommendation (score \< 6): \"One of the most common AI-app failures
  is leaking production secrets in a public repository. This is an
  active security vulnerability, not a theoretical risk. Book a £99
  audit for an immediate secrets review.\"

- Upsell: £99 Audit → leads to £500 Fix

**4.5 Category 6 --- Monitoring & Logging (Weight 10%)**

  ----------------------- -------------------- ----------- -------------
  **Question**            **Answer Options**   **Score**   **Risk if
                                                           No/None**

  Do you have uptime      Yes (paid tool) /    Paid=3,     HIGH
  monitoring?             Yes (free tool) / No Free=2,     
                                               No=0        

  Do you receive alerts   Yes / No             Yes=3, No=0 HIGH
  when your app goes                                       
  down?                                                    

  Are application errors  Yes / No / Basic     Yes=2,      HIGH
  logged and searchable?  console only         Basic=1,    
                                               No=0        

  Do you review logs at   Yes / No             Yes=2, No=0 MEDIUM
  least monthly?                                           
  ----------------------- -------------------- ----------- -------------

- Recommendation (score \< 5): \"Without monitoring, you will learn
  about production outages from angry users, not alerts. The DevOps Care
  Plan includes 24/7 uptime monitoring and incident alerting.\"

- Upsell: £500--£1,000/month Care Plan

**4.6 Category 10 --- Security Basics (Weight 10%)**

  ----------------------- -------------------- ------------ -------------
  **Question**            **Answer Options**   **Score**    **Risk if
                                                            No/None**

  Is your app served over Yes / No             Yes=3, No=0  CRITICAL
  HTTPS only?                                               

  Do you have a Web       Yes / No / Don\'t    Yes=2,       HIGH
  Application Firewall    Know                 Don\'t       
  (WAF)?                                       Know=1, No=0 

  Are dependency          Yes / No             Yes=2, No=0  HIGH
  vulnerabilities scanned                                   
  automatically?                                            

  Do you have rate        Yes / No / Partial   Yes=2,       HIGH
  limiting on your API?                        Partial=1,   
                                               No=0         

  Has any security review Yes (professional) / Prof=3,      HIGH
  been performed?         Self-review / No     Self=1, No=0 
  ----------------------- -------------------- ------------ -------------

- Recommendation (score \< 6): \"Your app is exposed to common web
  attacks. SQL injection, API abuse, and unpatched dependencies are the
  top attack vectors for AI-generated apps. A security audit should
  happen before you take your first paying customer.\"

- Upsell: £99 Audit

**4.7 Score Interpretation Table**

  ---------- -------------- ------------- ------------------------------
  **Total    **Risk Level** **Badge       **Summary Message**
  Score**                   Colour**      

  0--30      CRITICAL       Red           Your app has critical
                                          infrastructure gaps. Do not
                                          launch to paying users yet.

  31--50     HIGH RISK      Amber         Significant production risks
                                          identified. Several issues
                                          need urgent attention.

  51--70     MEDIUM RISK    Blue          Some gaps exist. Launching is
                                          possible but carry real risk
                                          without fixing these.

  71--85     LOW RISK       Cyan          Good posture with minor gaps.
                                          Monitor closely post-launch.

  86--100    PRODUCTION     Green         Strong production readiness.
             READY                        Keep monitoring and schedule
                                          quarterly reviews.
  ---------- -------------- ------------- ------------------------------